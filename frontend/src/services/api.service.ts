import { GoogleLoginResponse } from 'react-google-login';
import { core } from '~core';
import { db } from '~db';

const routes = core.Routes.relativeTo('http://localhost:8000');

export class APIService {
    static async login(tokenId: GoogleLoginResponse['tokenId']): Promise<db.user.Schema> {
        const res = await fetch(routes['/api/v1/auth/google'], {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            credentials: 'include',
            body: JSON.stringify({ token: tokenId } as core.GoogleOAuthRequest),
        });
        if (!res.ok) { throw await res.json(); }
        return await res.json();
    }

    static async getCurrentUser(): Promise<db.user.Schema> {
        const res = await fetch(routes['/currentuser'], {
            credentials: 'include',
        });
        if (!res.ok) { throw await res.json(); }
        return await res.json();
    }
}