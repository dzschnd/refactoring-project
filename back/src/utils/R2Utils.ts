import AWS from "aws-sdk";
import path from "path";
import type { S3 } from "aws-sdk";
import type { Express } from "express";

export const r2: S3 = new AWS.S3({
    endpoint: process.env.R2_ENDPOINT,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    region: 'auto',
    signatureVersion: 'v4',
});

const bucket = process.env.R2_BUCKET ?? "";

export const getParams = (file: Express.Multer.File, type: string, invitationId: number | string) => {
    const {originalname, buffer, mimetype} = file;
    const ext = path.extname(originalname);
    const baseName = path.basename(originalname, ext);
    const timestamp = Date.now();
    const uniqueName = `${type}-${invitationId}-${timestamp}${ext}`;

    return {
        Bucket: bucket,
        Key: uniqueName,
        Body: buffer,
        ContentType: mimetype,
        ACL: 'public-read',
    };
}

export const cleanupOldImages = async (draftId: number | string, type: string, currentKey: string): Promise<void> => {
    const currentTimestamp = extractTimestamp(currentKey);

    const listedObjects = await r2.listObjectsV2({
        Bucket: bucket,
        Prefix: `${type}-${draftId}-`
    }).promise();

    if (!listedObjects.Contents || listedObjects.Contents.length === 0) return;

    const deletePromises = listedObjects.Contents.map(async (obj) => {
        if (obj.Key && extractTimestamp(obj.Key) < currentTimestamp) {
            return r2.deleteObject({
                Bucket: bucket,
                Key: obj.Key
            }).promise();
        }
    });

    await Promise.all(deletePromises);
};

export const cleanupAllImages = async (draftId: number | string, type: string): Promise<void> => {
    const listedObjects = await r2.listObjectsV2({
        Bucket: bucket,
        Prefix: `${type}-${draftId}-`
    }).promise();

    if (!listedObjects.Contents || listedObjects.Contents.length === 0) return;

    const deletePromises = listedObjects.Contents.map(async (obj) => {
        if (!obj.Key) return;
        return r2.deleteObject({
            Bucket: bucket,
            Key: obj.Key
        }).promise();
    });

    await Promise.all(deletePromises);
};


const extractTimestamp = (key: string): number => {
    const parts = key.split('-');
    return parseInt(parts[2].split('.')[0], 10);
};
