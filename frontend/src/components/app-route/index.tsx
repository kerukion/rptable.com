import { VNode } from 'preact';
import { Route, RouteProps } from 'preact-router';
import { AppRoutes } from '~frontend/queries/routing';

export const AppRoute = Route as (<Props>(props: (Omit<RouteProps<Props>, 'path'> & { path: AppRoutes }) & Partial<Props>) => VNode<unknown>);
