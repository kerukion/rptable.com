import 'reflect-metadata';
import './controllers';
import cookies from 'cookie-parser';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { core } from '~core';
import { IAuthService, ICampaignService, IDbService, IUserService } from './interfaces';
import { AuthService, CampaignService, MongoDbService, UserService } from './services';
import { TOKENS } from './tokens';

const IOC = new Container();
IOC.bind<IDbService>(TOKENS.DbService).to(MongoDbService).inSingletonScope();
IOC.bind<IUserService>(TOKENS.UserService).to(UserService);
IOC.bind<IAuthService>(TOKENS.AuthService).to(AuthService);
IOC.bind<ICampaignService>(TOKENS.CampaignService).to(CampaignService);

const PORT = Number(process.env.PORT) || 8000;

const server = new InversifyExpressServer(IOC);
server.setConfig((app) => {
    app.use(cors({
        origin: 'http://localhost:8080',
        credentials: true,
    }));
    app.use(urlencoded({
        extended: true,
    }));
    app.use(json());
    app.use(cookies());
});

const app = server.build();
app.use((err: any, _: any, res: express.Response, __: any) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(err.stack);
    }
    const apiError = core.APIError.fromError(err);
    res.status(apiError.code).send(core.APIError.toResponse(apiError));
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`⚡️[server]: Server is running at http://0.0.0.0:${PORT}`);
    });
}

export { app, IOC };