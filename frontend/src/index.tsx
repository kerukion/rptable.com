import './style.scss';
import { FunctionalComponent, h, render } from 'preact';
import { Header } from './components/header';
import { Home, Login, NotFound, RedirectToLogin, Combat } from './routes';
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
            <RedirectToLogin default />
        </Router>)
    }

    return (
        <Router>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/combat" component={Combat} />
            {/* <Route path="/profile/:user" component={Profile} /> */}
            <NotFound default />
        </Router>
    );
};

const App: FunctionalComponent = () => {
    const queryClient = new QueryClient()

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