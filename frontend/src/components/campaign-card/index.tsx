import './style.scss';
import { FunctionalComponent, h } from 'preact';
import { db } from '~db';
import { FormButton } from '../forms';

interface CampaignCardProps {
    campaign: db.campaign.Schema;
    onSelect: () => void;
}

export const CampaignCard: FunctionalComponent<CampaignCardProps> = ({ campaign, onSelect }) => {
    return (
        <div className='campaign-card'>
            <img className='campaign-card--cover' src={campaign.imageUrl} />
            <h1 className='campaign-card--title'>{campaign.name}</h1>
            <p className='campaign-card--description'>
                {campaign.description}
            </p>
            <div className='campaign-card--actions'>
                <FormButton kind='action' 
                    onClick={onSelect}>
                    Select
                </FormButton>
            </div>
        </div>
    );
};