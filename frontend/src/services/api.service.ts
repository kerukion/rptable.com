import { GoogleLoginResponse } from 'react-google-login';
import { core } from '~core';
import { db } from '~db';

const routes = core.Endpoints.relativeTo('http://localhost:8000');

export class APIService {

    static async throwIfError(res: Response): Promise<void> {
        if (res.ok) {
            return;
        }
        if (res.headers.get('content-type')?.includes('application/json')) {
            throw await res.json() as core.APIErrorResponse;
        }
        const error: core.APIErrorResponse = { code: res.status, message: res.statusText };
        throw error;
    }

    static async newCampaign(data: core.NewCampaignForm): Promise<db.campaign.Schema> {
        const res = await fetch(routes['/campaigns'], {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            credentials: 'include',
            body: JSON.stringify(data as core.NewCampaignRequest),
        });
        await APIService.throwIfError(res);
        return await res.json();
    }

    static async getAllCampaigns(data: core.AllCampaignsRequest): Promise<db.campaign.Schema[]> {
        const res = await fetch(routes['/users/:id/campaigns'](data.user_createdby), {
            method: 'GET',
            headers: new Headers({ 'content-type': 'application/json' }),
            credentials: 'include',
        });
        await APIService.throwIfError(res);
        return await res.json();
    }

    static async getCampaign(data: core.CampaignRequest): Promise<db.campaign.Schema> {
        const res = await fetch(routes['/campaigns/:id'](data._id), {
            method: 'GET',
            headers: new Headers({ 'content-type': 'application/json' }),
            credentials: 'include',
        });
        await APIService.throwIfError(res);
        return await res.json();
    }

    static async login(tokenId: GoogleLoginResponse['tokenId']): Promise<db.user.Schema> {
        const res = await fetch(routes['/api/v1/auth/google'], {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            credentials: 'include',
            body: JSON.stringify({ token: tokenId } as core.GoogleOAuthRequest),
        });
        await APIService.throwIfError(res);
        return await res.json();
    }

    static async getCurrentUser(): Promise<db.user.Schema> {
        const res = await fetch(routes['/currentuser'], {
            credentials: 'include',
        });
        await APIService.throwIfError(res);
        return await res.json();
    }
}