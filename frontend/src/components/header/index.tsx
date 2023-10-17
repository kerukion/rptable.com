import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { core } from '~core';
import { db } from '~db';
import { useCampaignQuery, useLoginQuery, useSessionQuery } from '~frontend/queries';
import './style.scss';

export const Header: FunctionalComponent = () => {
    const userQuery = useLoginQuery();
    const campaignQuery = useCampaignQuery();
    const sessionQuery = useSessionQuery();

    const loginUI = (user: db.user.Schema | undefined, loading: boolean): JSX.Element => {
        if (loading) {
            return (<span>o</span>)
        }

        if (!user) {
           return (
                <Link href="/login">
                    Login
                </Link>
            );
        }

        return (
            <Link href={`/profile/${user._id}`}>
                {user.username}
            </Link>
        );
    }

    const sessionUI = (session?: core.Session): JSX.Element | null => {
        if (!session) {
            return null;
        }
        return (
            <span>
                Session #{session.number}: {session.name}
            </span>
        )
    }

    const campaignUI = (campaign?: core.Campaign, session?: core.Session): JSX.Element | null => {
        if (!campaign) {
            return null;
        }
        return (
            <span>
                {sessionUI(session)} ({campaign.name})
            </span>
        )
    }

    return (
        <header className="header">
            <h1 className="header--logo"> <Link href='/'> 🎲 RP Table </Link></h1>
            <nav>
                {campaignUI(campaignQuery.data, sessionQuery.data)}
                {loginUI(userQuery.data, userQuery.isLoading)}
            </nav>
        </header>
    );
};
