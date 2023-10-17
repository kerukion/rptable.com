import './style.scss';
import { Fragment, FunctionalComponent, h, render } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { Router, RouterOnChangeArgs, RouterProps } from 'preact-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { AppRoute, Header, RedirectTo } from './components';
import { useLoginQuery } from './queries';
import { AppRoutes, setRoute, useCanRoute } from './queries/routing';
import { Campaign, Campaigns, Encounter, Encounters, Login, NewCampaign, NewEncounter } from './routes';
import { store } from './store';

const MainRoutes: FunctionalComponent = () => {
    const userQuery = useLoginQuery();
    const [url, setUrl] = useState<AppRoutes>('/login');
    const redirect = useCanRoute(url);
    console.log('MR rerender', url, redirect);

    if (redirect) {
        setRoute(redirect);
    }

    if (userQuery.isLoading) {
        return <div>loading...</div>;
    }

    return (
        <Fragment>
            <Router onChange={(args) => setUrl(args.url as AppRoutes)}>
                <AppRoute path='/login' component={Login} />
                <AppRoute path='/campaigns' component={Campaigns} />
                <AppRoute path='/campaigns/new' component={NewCampaign} />
                <AppRoute path='/campaigns/:id' component={Campaign} />
                <AppRoute path='/encounters' component={Encounters} />
                <AppRoute path='/encounters/new' component={NewEncounter} />
                <AppRoute path='/encounters/:id' component={Encounter} />
                <RedirectTo to='/login' default />
            </Router>
        </Fragment>
    );
};

const App: FunctionalComponent = () => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

    return (
        <div id='preact_root'>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <Header />
                    <MainRoutes />
                </QueryClientProvider>
            </Provider>
        </div>
    );
};

render(<App />, document.body);