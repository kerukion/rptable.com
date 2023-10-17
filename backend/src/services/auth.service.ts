import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import { inject, injectable } from 'inversify';
import { IAuthService, IDbService, IUserService } from '~backend/interfaces';
import { TOKENS } from '~backend/tokens';
import { core } from '~core';
import { db } from '~db';
import { UserService } from '.';
const GOOGLE_OAUTH_CLIENT_ID = '270087464037-10kcjadihf5tbe78mir7rs3h25jn9rq4.apps.googleusercontent';
const client = new OAuth2Client(GOOGLE_OAUTH_CLIENT_ID);

@injectable()
export class AuthService implements IAuthService {
    private static COOKIE_NAME = 'rptable_user';
    private static MINUTES_60_IN_MS = 60 * 60 * 1000;
    constructor(
        @inject(TOKENS.DbService) private dbService: IDbService,
        @inject(TOKENS.UserService) private userService: IUserService
    ) { }

    public async currentUser(req: core.Request): Promise<db.user.Schema | undefined> {
        const userCookie = req.cookies[AuthService.COOKIE_NAME];
        if (!userCookie) {
            throw new core.APIError(401, 'User is not logged in.');
        }
        const userData = await this.userService.getUserById(userCookie);
        if (!userData) {
            throw new core.APIError(403, 'User does not exist.');
        }
        return userData;
    }

    public async googleOAuth(req: core.Request<core.GoogleOAuthRequest>, res: express.Response): Promise<db.user.Schema> {
        const { token }  = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
        });
        const payload = ticket.getPayload();    
        if (!payload) {
            throw new core.APIError(401, 'Authorization failed.');
        }
        
        const Users = await this.dbService.Users();
        const user = await Users.findOne({ username: payload.email } as db.user.Schema);

        if (user) {
            this.loginWithCookie(res, user._id);
            return user;
        }
        
        const newUser = await Users.create({
            username: payload.email,
            name: payload.name,
        } as db.user.Schema);
        this.loginWithCookie(res, newUser._id);

        return UserService.documentToSchema(newUser);
    }

    // async login(req: express.Request<Record<string, unknown>, Record<string, unknown>, core.LoginRequest>, res: express.Response): Promise<db.user.Schema | undefined> {
    //     const user = await this.userService.getUserByUsername(req.body.username);
    //     if (!user) {
    //         throw new core.APIError(403, 'User does not exist.')
    //     }
    //     this.loginWithCookie(res, user._id);
    //     return user;
    // }

    public logout(_: express.Request, res: express.Response): void {
        res.clearCookie(AuthService.COOKIE_NAME);
    }

    public loginWithCookie(res: express.Response, userId: db.user.Schema['_id']): void {
        res.cookie(AuthService.COOKIE_NAME, userId, {
            expires: new Date(Date.now() + AuthService.MINUTES_60_IN_MS),
            httpOnly: true,
        });
    }
}