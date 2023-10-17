import express from 'express';
import { inject } from 'inversify';
import { controller, httpGet,httpPost, interfaces,  } from 'inversify-express-utils';
import { IAuthService } from '~backend/interfaces';
import { routes } from '~backend/routes';
import { TOKENS } from '~backend/tokens';
import { db } from '~db';

@controller('')
export class AuthController implements interfaces.Controller {

    constructor(@inject(TOKENS.AuthService) private authService: IAuthService) { }

    @httpGet(routes['/currentuser'])
    public async currentUser(req: express.Request): Promise<db.user.Schema | undefined> {
        const user = await this.authService.currentUser(req);
        return user;
    }
    

    @httpPost(routes['/api/v1/auth/google'])
    public async googleOAuth(req: express.Request, res: express.Response): Promise<db.user.Schema | undefined> {
        const user = await this.authService.googleOAuth(req, res);
        res.status(201)
        return user;
    }

    // @httpPost(routes["/login"])
    // private async login(req: express.Request<Record<string, unknown>, Record<string, unknown>, core.LoginRequest>, res: express.Response): Promise<db.user.Schema | undefined> {
    //     const user = await this.authService.login(req, res);
    //     res.status(200);
    //     return user;
    // }

    // @httpDelete(routes["/logout"])
    // private logout(req: express.Request, res: express.Response): { code: number } {
    //     this.authService.logout(req, res);
    //     return {
    //         code: 200
    //     };
    // }
}
