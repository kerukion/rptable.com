import { injectable } from 'inversify';
import { connect, Model } from 'mongoose';
import { BehaviorSubject, firstValueFrom,race, Subject } from 'rxjs';
import { filter, skip, take } from 'rxjs/operators';
import { IDbService } from '~backend/interfaces';
import { core } from '~core';
import { db } from '~db';

interface ConnectionStatus {
    success: boolean;
    error?: string;
}

@injectable()
export class MongoDbService implements IDbService {
    private static DB_URL = 'mongodb://localhost:27017/rptablecom';
    private connectionStatus$ = new BehaviorSubject<ConnectionStatus>({ success: false, error: undefined });
    private connectionRequested$ = new Subject<void>();

    constructor() {
        this.debounceConnectionRequest();
    }

    async Users(): Promise<Model<db.user.Document>> {
        await this.attemptDbConnection();
        return db.user.model;
    }

    async Campaigns(): Promise<Model<db.campaign.Document>> {
        await this.attemptDbConnection();
        return db.campaign.model;
    }

    private debounceConnectionRequest() {
        return this.connectionRequested$
            .pipe(take(1))
            .subscribe(async () => {
                try {
                    await connect(MongoDbService.DB_URL);
                    this.connectionStatus$.next({ success: true, error: undefined });
                }
                catch (err) {
                    this.connectionStatus$.next({ success: true, error: 'Database unavailable.' });
                    this.debounceConnectionRequest();
                }
            });
    }

    private async attemptDbConnection() {
        this.connectionRequested$.next();
        const status = await firstValueFrom(race(
            this.connectionStatus$.pipe(filter((ready: ConnectionStatus) => ready.success)),
            this.connectionStatus$.pipe(skip(1), filter((ready: ConnectionStatus) => !!ready.error))
        ));

        if (status.error) {
            throw new core.APIError(500, status.error);
        }
    }
}