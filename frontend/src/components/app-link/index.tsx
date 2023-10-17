import { VNode } from 'preact';
import { Link } from 'preact-router'
import { AppRoutes } from '~frontend/queries/routing'

export const AppLink = Link as (props: { activeClassName?: string, href: AppRoutes } & preact.JSX.HTMLAttributes) => VNode;
