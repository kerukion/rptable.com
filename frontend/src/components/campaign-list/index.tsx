import './style.scss';
import { FunctionalComponent, h } from 'preact';
import { core } from '~core';
import { CampaignCard } from '../campaign-card';

interface CampaignListProps {
    campaigns: core.Campaign[];
}

export const CampaignList: FunctionalComponent<CampaignListProps> = ({ campaigns }) => {
    // Logic for permissions of being able to create more than 1 campaign (requires membership)
    return (
        <div className='campaign-list'>
            {campaigns.map((c) => (
                <div key={c.id} className='campaign-list--campaign'>
                    <CampaignCard campaign={c} />
                </div>
            ))}
        </div>
    );
};
