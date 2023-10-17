import './style.scss';
import { Fragment, FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { useSelector } from 'react-redux';
import { core } from '~core';
import { db } from '~db';
import { useCampaignQuery, useLoginQuery, useLogoutMutation } from '~frontend/queries';
import { asRoute, useRouteGuards } from '~frontend/queries/routing';
import { RootState } from '~frontend/store';
import { useTraceUpdate } from '~frontend/utils/trace';
import { AppLink } from '../app-link';
import { FloatingButtons } from '../floating-buttons';
import { FormButton } from '../forms';

export const Header: FunctionalComponent = () => {
    const userQuery = useLoginQuery();
    console.log('Header re-render', userQuery.data);
    const { value: campaignId } = useSelector((state: RootState) => state.campaign);
    const campaignQuery = useCampaignQuery(campaignId);
    const canRouteToCampaigns = !useRouteGuards('/campaigns');
    const { mutateAsync: handleLogout } = useLogoutMutation();

    // const x = useTraceUpdate();
    // console.log(x);

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
            <FloatingButtons child={
                <Link href={`/profile/${user._id}`}>
                    {user.username}
                </Link>
            }>
                <FormButton kind='misc' size='elastic' onClick={() => handleLogout()}>Logout</FormButton>
                {/* <FormButton kind='misc' size='elastic'>settings</FormButton> */}
            </FloatingButtons>

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
                        {campaign.name}
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
                {canRouteToCampaigns && (
                    campaignUI(campaignQuery.data)
                )}
                {loginUI(userQuery.data, userQuery.isLoading)}
            </nav>
        </header>
    );
};
