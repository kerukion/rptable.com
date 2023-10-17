import { db } from '~db';

const addHostFn = (url: string) => (path: string) => `${url}${path}`;

const getEndpoints = (baseUrl: string) => {
    const addHost = addHostFn(baseUrl);
    return {
        '/login': addHost('/login'),
        '/currentuser': addHost('/currentuser'),
        '/api/v1/auth/google': addHost('/api/v1/auth/google'),
        '/campaigns': addHost('/campaigns'),
        '/users/:id/campaigns': (id: db.user.Schema['_id']) => addHost(`/users/${id}/campaigns`),
        '/campaigns/:id': (id: db.campaign.Schema['_id']) => addHost(`/campaigns/${id}`),
        // '/chatrooms/:id/messages/recent': (id: db.chatroom.Schema['_id']) => `${baseUrl}/chatrooms/${id}/messages/recent`,
    }
};

export class Endpoints {
    static relativeTo = getEndpoints;
}