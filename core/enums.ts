
export enum CreatureGroupAlignment {
    PARTY,
    ENEMY,
    NEUTRAL,
    OTHER
}

export enum Class {
    BARBARIAN,
    BARD,
    CLERIC,
    DRUID,
    FIGHTER,
    MONK,
    PALADIN,
    RANGER,
    ROGUE,
    SORCEROR,
    WARLOCK,
    WIZARD,
    OTHER
}


export enum ActionStates {
    HELD,
    USED,
    UNUSED
}

export enum Condition {
    BLINDED,
    CHARMED,
    DEAFENED,
    FRIGHTENED,
    GRAPPLED,
    INCAPACITATED,
    INVISIBLE,
    PARALYZED,
    PETRIFIED,
    POISONED,
    PRONE,
    RESTRAINED,
    STUNNED,
    SURPRISED,
    UNCONSCIOUS,
    EXHAUSTION,
    OTHER
}

export enum CreatureInstanceType {
    PLAYER = 'PLAYER',
    CHARACTER = 'CHARACTER',
    CREATURE = 'CREATURE'
}

export enum TurnPart {
    START,
    END,
}

// add rule for PREFER INITIALIZED ENUMS...