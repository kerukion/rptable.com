import './style.scss';
import { FunctionalComponent, h, render } from 'preact';
import { Route, Router } from 'preact-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from './components/header';
import { useLoginQuery } from './queries';
import { Campaigns, Login, NewEncounter,RedirectTo } from './routes';

const MainRoutes: FunctionalComponent = () => {
    const userQuery = useLoginQuery();

    if (userQuery.isLoading) {
        return <div>loading...</div>
    }

    if (userQuery.error || !userQuery.data) {
        return (<Router>
            <Route path='/login' component={Login} />
            <RedirectTo to='/login' default />
        </Router>)
    }

    return (
        <Router>
            <Route path='/campaigns' component={Campaigns} />
            <Route path='/encounters/new' component={NewEncounter} /> 
            {/* <Route path="/profile/:user" component={Profile} /> */}
            <RedirectTo to='/campaigns' default />
        </Router>
    );
};

const App: FunctionalComponent = () => {
    const queryClient = new QueryClient({ defaultOptions: {queries: {refetchOnWindowFocus: false}}})

    return (
        <div id='preact_root'>
            <QueryClientProvider client={queryClient}>
                <Header />
                <MainRoutes />
            </QueryClientProvider>
        </div>
    );
};

render(<App />, document.body);