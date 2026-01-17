import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/AuthRoutes.js';
import draftRoutes from './routes/DraftRoutes.js';
import publishedInvitationRoutes from './routes/PublishedInvitationRoutes.js';
import uploadRoutes from './routes/UploadRoutes.js';
import cookieParser from "cookie-parser";
import session from "express-session";

dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.CLIENT_DOMAIN,
    credentials: true,
    exposedHeaders: 'Set-Cookie',
    Headers: true,
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.COOKIE_SECURE === 'true',
        maxAge: 24 * 60 * 60 * 1000 * 365 * 100
    }
}));

app.use(express.json());

app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/drafts', draftRoutes);
app.use('/published-invitations', publishedInvitationRoutes);
app.use('/upload', uploadRoutes);

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server started');
});
