import './style.scss';
import { FunctionalComponent, h } from 'preact';
import { useDispatch } from 'react-redux';
import { core } from '~core';
import { db } from '~db';
import { CampaignList, FormButton } from '~frontend/components';
import { useCampaignsForUserQuery, useLoginQuery } from '~frontend/queries';
import { asRoute, setRoute } from '~frontend/queries/routing';
import { actions } from '~frontend/store';

export * from './new';
export * from './id';
export const Campaigns: FunctionalComponent = () => {
    const dispatch = useDispatch();
    const { data: user, isLoading: loadingUser } = useLoginQuery();
    const { data: campaigns, isLoading: loadingCampaigns } = useCampaignsForUserQuery(user?._id);
    const chooseCampaign = (id: db.campaign.Schema['_id']) => {
        dispatch(actions.campaign.set({ value: id }))
        setRoute(asRoute('/campaigns/:id', id!))
    };
    const newCampaign = () => setRoute('/campaigns/new');

    if (loadingUser || loadingCampaigns) {
        return null;
    }

    return (
        <div className='campaigns'>
            <div className='campaigns--title-bar'>
                <h2>Choose your Campaign</h2>
                <div className='campaigns--new-campaign'>
                    <FormButton kind='action'
                        onClick={newCampaign}>
                        + New Campaign
                    </FormButton>
                    <div className='campaigns--campaign-slots'>
                        (1/2 slots used)
                    </div>
                </div>
            </div>

            <CampaignList campaigns={campaigns!} onSelect={(c) => chooseCampaign(c._id)} />
        </div>
    );
};
