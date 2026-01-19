import AWS from "aws-sdk";
import path from "path";
export const r2 = new AWS.S3({
    endpoint: process.env.R2_ENDPOINT,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    region: "auto",
    signatureVersion: "v4",
});
const bucket = process.env.R2_BUCKET ?? "";
export const isR2Configured = () => {
    return Boolean(process.env.R2_ENDPOINT &&
        process.env.R2_ACCESS_KEY_ID &&
        process.env.R2_SECRET_ACCESS_KEY &&
        process.env.R2_BUCKET);
};
export const getParams = (file, type, invitationId) => {
    const { originalname, buffer, mimetype } = file;
    const ext = path.extname(originalname);
    const timestamp = Date.now();
    const uniqueName = `${type}-${invitationId}-${timestamp}${ext}`;
    return {
        Bucket: bucket,
        Key: uniqueName,
        Body: buffer,
        ContentType: mimetype,
        ACL: "public-read",
    };
};
export const cleanupOldImages = async (draftId, type, currentKey) => {
    const currentTimestamp = extractTimestamp(currentKey);
    const listedObjects = await r2
        .listObjectsV2({
        Bucket: bucket,
        Prefix: `${type}-${draftId}-`,
    })
        .promise();
    if (!listedObjects.Contents || listedObjects.Contents.length === 0)
        return;
    const deletePromises = listedObjects.Contents.map(async (obj) => {
        if (obj.Key && extractTimestamp(obj.Key) < currentTimestamp) {
            return r2
                .deleteObject({
                Bucket: bucket,
                Key: obj.Key,
            })
                .promise();
        }
    });
    await Promise.all(deletePromises);
};
export const cleanupAllImages = async (draftId, type) => {
    const listedObjects = await r2
        .listObjectsV2({
        Bucket: bucket,
        Prefix: `${type}-${draftId}-`,
    })
        .promise();
    if (!listedObjects.Contents || listedObjects.Contents.length === 0)
        return;
    const deletePromises = listedObjects.Contents.map(async (obj) => {
        if (!obj.Key)
            return;
        return r2
            .deleteObject({
            Bucket: bucket,
            Key: obj.Key,
        })
            .promise();
    });
    await Promise.all(deletePromises);
};
const extractTimestamp = (key) => {
    const parts = key.split("-");
    return parseInt(parts[2].split(".")[0], 10);
};
