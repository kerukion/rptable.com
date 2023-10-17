import './style.scss';
import { FunctionalComponent, h } from 'preact';
import { useCampaignQuery } from '~frontend/queries';

export const Combat: FunctionalComponent = () => {

    // const campaignQuery = useCampaignQuery();

    return (
        <div className="combat">
            <div className="combat--title-bar">
                <h2>Encounter Tracker</h2>
                <div className="home--new-campaign">
                    <button>
                        + New Campaign
                        <div className="home--campaign-slots">
                            (1/2 slots used)
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};
