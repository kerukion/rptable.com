import './style.scss';
import { FunctionalComponent, h } from 'preact';
import { core } from '~core';

interface InitiativeCardProps {
    creature: core.Creature;
}

export const InitiativeCard: FunctionalComponent<InitiativeCardProps> = ({ creature: character }) => {
    return (
        <div className='campaign-card'>
            {character.name}
            {/* <img className="campaign-card--cover" src={campaign.imageUrl} />
            <h1 className="campaign-card--title">{campaign.name}</h1>
            <p className="campaign-card--description">
                {campaign.description}
            </p>
            <div className="campaign-card--actions">
                <button>
                    View
                </button>
                <button>
                    Edit
                </button>
                <button>
                    Delete
                </button>
            </div> */}
        </div>
    );
};