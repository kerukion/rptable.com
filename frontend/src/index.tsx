import './style.scss';
import { FunctionalComponent, h, render } from 'preact';
import { Header } from './components/header';
import { Home, Login, Combat, RedirectTo, NewCombat } from './routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Router } from 'preact-router';
import { useLoginQuery } from './queries';

const MainRoutes: FunctionalComponent = () => {
    const userQuery = useLoginQuery();

    if (userQuery.isLoading) {
        return <div>loading...</div>
    }

    if (userQuery.error || !userQuery.data) {
        return (<Router>
            <Route path="/login" component={Login} />
            {/* delete this vv */}
            <Route path="/combat" component={Combat} /> 
            <Route path="/combat/new" component={NewCombat} /> 
            <RedirectTo to="/login" default />
        </Router>)
    }

    return (
        <Router>
            <Route path="/" component={Home} />
            <Route path="/combat" component={Combat} />
            {/* <Route path="/profile/:user" component={Profile} /> */}
            <RedirectTo to="/" default />
        </Router>
    );
};

const App: FunctionalComponent = () => {
    const queryClient = new QueryClient({ defaultOptions: {queries: {refetchOnWindowFocus: false}}})

    return (
        <div id="preact_root">
            <QueryClientProvider client={queryClient}>
                <Header />
                <MainRoutes />
            </QueryClientProvider>
        </div>
    );
};

render(<App />, document.body);