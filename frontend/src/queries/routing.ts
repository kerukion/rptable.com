import { route } from 'preact-router';
import { useSelector } from 'react-redux';
import { db } from '~db';
import { RootState } from '~frontend/store';
import { useLoginQuery } from '.';

export const asRoute = (r: AppRoutes, id: string): AppRoutes => {
    if (!r.includes(':id')) {
        throw Error(`Tried to route by id to ${r} that does not accept id in path.`)
    }

    return r.replace(':id', id) as AppRoutes;
};

export const setRoute = (r: AppRoutes) => route(r, true);
const ROUTES = [
    '/login',
    '/campaigns',
    '/campaigns/new',
    '/campaigns/:id',
    '/encounters',
    '/encounters/new',
    '/encounters/:id',
] as const;
export type AppRoutes = typeof ROUTES[number];

interface RouteContext {
    user?: db.user.Schema;
    campaignId?: string;
}

type RedirectTo = AppRoutes;
type RouteResponse = RedirectTo | undefined;

const loggedInGuard = (context: RouteContext): RouteResponse => {
    if (!context.user) {
        return '/login';
    }
    return undefined;
};

const campaignPickedGuard = (context: RouteContext): RouteResponse => {
    if (!context.campaignId) {
        return '/campaigns';
    }
    return undefined;
};

const routeMatch: Partial<Record<AppRoutes, RegExp>> = {
    '/campaigns/:id': /^\/campaigns\/\w{24}$/,
    '/encounters/:id': /^\/encounters\/\w{24}$/,
};

const getAppRoute = (route: AppRoutes): AppRoutes | undefined => {
    const match = Object.entries(routeMatch).find(([_, reg]) => reg.test(route));
    if (match) {
        return match[0] as AppRoutes;
    }

    if (ROUTES.includes(route)) {
        return route;
    }

    return undefined;
}

const canRoute: Record<AppRoutes, Array<(c: RouteContext) => RouteResponse>> = ({
    '/login': [({ user, campaignId }: RouteContext) => {
        if (!user) {
            return undefined;
        }
        if (campaignId) {
            return asRoute('/campaigns/:id', campaignId);
        }
        return '/campaigns';
    }],
    '/campaigns': [loggedInGuard],
    '/campaigns/new': [loggedInGuard],
    '/campaigns/:id': [loggedInGuard],
    '/encounters': [loggedInGuard, campaignPickedGuard],
    '/encounters/new': [loggedInGuard, campaignPickedGuard],
    '/encounters/:id': [loggedInGuard],
});

export const useCanRoute = (route: AppRoutes): RouteResponse => {
    const { data: user } = useLoginQuery();
    const { value: campaignId } = useSelector((state: RootState) => state.campaign)
    const appRoute = getAppRoute(route);
    console.log('useCanRoute: approute', appRoute, route)
    if (!appRoute) {
        return '/login';
    }
    const context: RouteContext = { user, campaignId };
    const failedGuard = canRoute[appRoute].find(rg => !!rg(context));
    const redirect = failedGuard ? failedGuard(context) : undefined;
    console.log('useCanRoute: result', route, user, campaignId, redirect)
    return redirect;
};
