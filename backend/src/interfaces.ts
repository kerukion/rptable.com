import express from 'express';
import { Model } from 'mongoose';
import { core } from '~core';
import { db } from '~db';

export interface ICampaignService {
    newCampaign: (req: core.Request<core.NewCampaignRequest>) => Promise<db.campaign.Schema>;
    getAll: (id: db.user.Schema['_id']) => Promise<db.campaign.Schema[] | undefined>;
    get: (id: db.campaign.Schema['_id']) => Promise<db.campaign.Schema | undefined>;
}

export interface IAuthService {
    currentUser: (req: core.Request) => Promise<db.user.Schema | undefined>;
    googleOAuth: (req: core.Request<core.GoogleOAuthRequest>, res: express.Response) => Promise<db.user.Schema>;
    logout: (req: express.Request, res: express.Response) => void;
    // login: (req: express.Request<Record<string, unknown>, Record<string, unknown>, core.LoginRequest>, res: express.Response) => Promise<db.user.Schema | undefined>;
}

export interface IDbService {
    Users: () => Promise<Model<db.user.Document>>;
    Campaigns: () => Promise<Model<db.campaign.Document>>;
}

export interface IUserService {
    createUser: (user: db.user.Schema) => Promise<db.user.Schema | undefined>;
    getUserById: (userId: db.user.Schema['_id']) => Promise<db.user.Schema | undefined>;
}
