
export enum CreatureGroupAlignment {
    PARTY = 'PARTY',
    ENEMY = 'ENEMY',
    NEUTRAL = 'NEUTRAL',
    OTHER = 'OTHER'
}

export enum Class {
    BARBARIAN = 'BARBARIAN',
    BARD = 'BARD',
    CLERIC = 'CLERIC',
    DRUID = 'DRUID',
    FIGHTER = 'FIGHTER',
    MONK = 'MONK',
    PALADIN = 'PALADIN',
    RANGER = 'RANGER',
    ROGUE = 'ROGUE',
    SORCEROR = 'SORCEROR',
    WARLOCK = 'WARLOCK',
    WIZARD = 'WIZARD',
    OTHER = 'OTHER'
}


export enum ActionStates {
    HELD = 'HELD',
    USED = 'USED',
    UNUSED = 'UNUSED'
}

export enum Condition {
    BLINDED = 'BLINDED',
    CHARMED = 'CHARMED',
    DEAFENED = 'DEAFENED',
    FRIGHTENED = 'FRIGHTENED',
    GRAPPLED = 'GRAPPLED',
    INCAPACITATED = 'INCAPACITATED',
    INVISIBLE = 'INVISIBLE',
    PARALYZED = 'PARALYZED',
    PETRIFIED = 'PETRIFIED',
    POISONED = 'POISONED',
    PRONE = 'PRONE',
    RESTRAINED = 'RESTRAINED',
    STUNNED = 'STUNNED',
    SURPRISED = 'SURPRISED',
    UNCONSCIOUS = 'UNCONSCIOUS',
    EXHAUSTION = 'EXHAUSTION',
    OTHER = 'OTHER'
}

export enum CreatureType {
    PLAYER = 'PLAYER',
    CHARACTER = 'CHARACTER',
    CREATURE = 'CREATURE'
}

export enum TurnPart {
    START = 'START',
    END = 'END',
}
