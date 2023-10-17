import { v4 as uuidv4 } from 'uuid';
import { core } from '~core';

const unsetGroup = (): core.CreatureGroup => ({
    instanceId: uuidv4(),
    name: 'Ungrouped',
    alignment: core.CreatureGroupAlignment.NEUTRAL,
    color: '#fef3bd',
});

const groups = (): core.CreatureGroup[] => [
    {
        instanceId: uuidv4(),
        name: 'Party',
        alignment: core.CreatureGroupAlignment.PARTY,
        color: '#c1e1c5',
    },
    {
        instanceId: uuidv4(),
        name: 'Enemies',
        alignment: core.CreatureGroupAlignment.ENEMY,
        color: '#eb9694',
    },
    {
        instanceId: uuidv4(),
        name: 'Neutral',
        alignment: core.CreatureGroupAlignment.NEUTRAL,
        color: '#fef3bd',
    },
];

export const defaults = {
    unsetGroup,
    groups,
};