import { FunctionalComponent, h } from 'preact';
import { core } from '~core';
import './style.scss';

interface GroupCardProps {
    group: core.CreatureGroup;
}

export const GroupCard: FunctionalComponent<GroupCardProps> = ({ group }) => {

    return (
        <div className="group-card">
            <span style={`background-color: ${group.color}`}></span>
            <h1>
                {group.name}
            </h1>
            <button>
                Delete
            </button>
            <button>
                Collapse/Expand
            </button>
        </div>
    );
};