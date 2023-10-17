import './style.scss';
import { Fragment, FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { useSelector } from 'react-redux';
import { core } from '~core';
import { db } from '~db';
import { useCampaignQuery, useLoginQuery } from '~frontend/queries';
import { asRoute, useCanRoute } from '~frontend/queries/routing';
import { RootState } from '~frontend/store';
import { AppLink } from '../app-link';

export const Header: FunctionalComponent = () => {
    const userQuery = useLoginQuery();
    const { value: campaignId } = useSelector((state: RootState) => state.campaign);
    const campaignQuery = useCampaignQuery(campaignId);
    const canRouteToCampaigns = !useCanRoute('/campaigns');
    const canRouteToEncounters = !useCanRoute('/encounters');

    const loginUI = (user: db.user.Schema | undefined, loading: boolean): JSX.Element => {
        if (loading) {
            return (<span>o</span>);
        }

        if (!user) {
            return (
                <AppLink href='/login'>
                    Login
                </AppLink>
            );
        }

        return (
            <Link href={`/profile/${user._id}`}>
                {user.username}
            </Link>
        );
    };

    const campaignUI = (campaign?: db.campaign.Schema): JSX.Element => {
        if (!campaign) {
            return (
                <span>
                    <AppLink activeClassName='active' href='/campaigns'>
                        Campaigns
                    </AppLink>
                </span>
            );
        }
        return (
            <Fragment>
                <span>
                    <AppLink activeClassName='active' href={asRoute('/campaigns/:id', campaignId!)}>
                        Campaign: {campaign.name}
                    </AppLink>
                </span>
                <span>
                    <AppLink activeClassName='active' href='/campaigns'>
                        Campaigns
                    </AppLink>
                </span>
            </Fragment>
        );
    };

    return (
        <header className='header'>
            <h1 className='header--logo'> <Link href='/'> 🎲 RP Table </Link></h1>
            <nav>
                {canRouteToEncounters && (
                    <AppLink activeClassName='active' href='/encounters/new'>
                        New Encounter
                    </AppLink>
                )}
                {canRouteToCampaigns && (
                    campaignUI(campaignQuery.data)
                )}
                {loginUI(userQuery.data, userQuery.isLoading)}
            </nav>
        </header>
    );
};
