// import { db } from "~db";
const localize = (url: string) => (path: string) => `${url}${path}`;

const getRoutes = (baseUrl: string) => {
    const localizeUrl = localize(baseUrl);
    return {
        '/login': localizeUrl('/login'),
        '/currentuser': localizeUrl('/currentuser'),
        '/api/v1/auth/google': localizeUrl('/api/v1/auth/google')
        // '/chatrooms/:id/messages': (id: db.chatroom.Schema['_id']) => `${baseUrl}/chatrooms/${id}/messages`,
        // '/chatrooms/:id/messages/recent': (id: db.chatroom.Schema['_id']) => `${baseUrl}/chatrooms/${id}/messages/recent`,
    }
};

export class Routes {
    static relativeTo = getRoutes;
}