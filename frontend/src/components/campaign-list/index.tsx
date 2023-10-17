import { FunctionalComponent, h } from 'preact';
import { core } from '~core';
import { CampaignCard } from '../campaign-card';
import './style.scss';

interface CampaignListProps {
    campaigns: core.Campaign[];
}

export const CampaignList: FunctionalComponent<CampaignListProps> = ({ campaigns }) => {
    // Logic for permissions of being able to create more than 1 campaign (requires membership)
    return (
        <div className="campaign-list">
            {campaigns.map((c) => (
                <div className="campaign-list--campaign">
                    <CampaignCard campaign={c} />
                </div>
            ))}
        </div>
    );
};
