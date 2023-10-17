import './style.scss';
import { FunctionalComponent, h } from 'preact';
import { core } from '~core';
import { CampaignList } from '~frontend/components';

export * from './new';
export * from './id';
export const Campaigns: FunctionalComponent = () => {
    const mockCampaign: core.Campaign = {
        id: '1',
        name: 'The Rival Gods',
        description: 'The world of Estrador, invaded by the magic of the Godlands, becomes the latest battlefield in the Far War of the Four Rival Gods.',
        imageUrl: 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2020/04/Tyr.jpg?q=50&fit=crop&w=1400&dpr=1.5'
    }

    return (
        <div className="home">
            <div className="home--title-bar">
                <h2>Choose your Campaign</h2>
                <div className="home--new-campaign">
                    <button className="create">
                        + New Campaign
                        <div className="home--campaign-slots">
                            (1/2 slots used)
                        </div>
                    </button>
                </div>
            </div>
           
            <CampaignList campaigns={[mockCampaign]} />
        </div>
    );
};
