import express from 'express';
import { Model } from 'mongoose';
import { core } from '~core';
// import { core } from "~core";
import { db } from '~db';

// export interface IChatroomService {
//     getAll: () => Promise<core.GetAllChatrooms | undefined>;
//     getLatestMessages: (id: db.chatroom.Schema['_id']) => Promise<core.GetLatestMessagesForChatroom | undefined>;
//     newMessage: (req: express.Request<{ id: string }, Record<string, unknown>, core.NewMessageRequest>, res: express.Response) => Promise<db.message.Schema>;
//     newRoom: (req: express.Request<Record<string, unknown>, Record<string, unknown>, core.NewRoomRequest>) => Promise<db.chatroom.Schema>;
// }

export interface IAuthService {
    // login: (req: express.Request<Record<string, unknown>, Record<string, unknown>, core.LoginRequest>, res: express.Response) => Promise<db.user.Schema | undefined>;
    currentUser: (req: express.Request<Record<string, unknown>, Record<string, unknown>, unknown>) => Promise<db.user.Schema | undefined>;
    googleOAuth: (req: express.Request<Record<string, unknown>, Record<string, unknown>, core.GoogleOAuthRequest>, res: express.Response) => Promise<db.user.Schema>;
    // logout: (req: express.Request, res: express.Response) => void;
}

export interface IDbService {
    Users: () => Promise<Model<db.user.Document>>;
}

export interface IUserService {
    createUser: (user: db.user.Schema) => Promise<db.user.Schema | undefined>;
    getUserById: (userId: db.user.Document['id']) => Promise<db.user.Schema | undefined>;
}
