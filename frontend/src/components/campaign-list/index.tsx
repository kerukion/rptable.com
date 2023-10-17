import './style.scss';
import { FunctionalComponent, h } from 'preact';
import { db } from '~db';
import { CampaignCard } from '../campaign-card';

interface CampaignListProps {
    campaigns: db.campaign.Schema[];
    onSelect: (c: db.campaign.Schema) => void;
}

export const CampaignList: FunctionalComponent<CampaignListProps> = ({ campaigns, onSelect }) => {
    // Logic for permissions of being able to create more than 1 campaign (requires membership)
    return (
        <div className='campaign-list'>
            {campaigns.map((c) => (
                <div key={c._id} className='campaign-list--campaign'>
                    <CampaignCard campaign={c} onSelect={() => onSelect(c)} />
                </div>
            ))}
        </div>
    );
};
