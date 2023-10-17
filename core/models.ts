import express from 'express';
import { Delta } from 'jsondiffpatch';
import { db } from '~db';
import * as enums from './enums';


export interface Location {
    id: string;
    campaignId: string;
    parentLocationId?: string;
    name: string;
    description: string;
}

export interface Session {
    id: string;
    campaignId: string;
    name: string;
    number: number;
}

export interface EncounterCore {
    id: string;
    sessionIds: string[];
    campaignId: string;
    locationIds: string[];
    name: string;
}

export interface Encounter extends EncounterCore {
    // model as 1 Encounter, can appear in the listing of multiple sessions however.
    currentLocationId: string; // optional?
    currentSessionId: string;
    currentRound: number;
    // instances: CreatureInstance[];
    // players: PlayerCharacter[];
    // characters: Character[];
    // creatures: Creature[];
    creatureGroups: CreatureGroup[];
    currentTurn: CreatureInstance['instanceId'];
    instanceMapping: InstanceCreatureMap;
    initiativeMapping: Record<CreatureInstance['instanceId'], number>; // initiative order is derived from this object, inverted
    conditionMapping: Record<CreatureInstance['instanceId'], ConditionInstance[]>;
    creatureGroupMapping: Record<CreatureInstance['instanceId'], CreatureGroup['instanceId']>;
    actionMapping: Record<CreatureInstance['instanceId'], enums.ActionStates>;
    bonusActionMapping: Record<CreatureInstance['instanceId'], Exclude<enums.ActionStates, enums.ActionStates.HELD>>;
    reactionMapping: Record<CreatureInstance['instanceId'], Exclude<enums.ActionStates, enums.ActionStates.HELD>>;
    inactiveInstanceIds: CreatureInstance['instanceId'][];
}

export interface InstanceCreatureMap {
    [enums.CreatureType.PLAYER]: Record<CreatureInstance['instanceId'], PlayerInstance>;
    [enums.CreatureType.CHARACTER]: Record<CreatureInstance['instanceId'], CreatureInstance>;
    [enums.CreatureType.CREATURE]: Record<CreatureInstance['instanceId'], CreatureInstance>;
}

export interface CampaignCreatureMap {
    [enums.CreatureType.PLAYER]: Player[];
    [enums.CreatureType.CHARACTER]: Creature[];
    [enums.CreatureType.CREATURE]: Creature[];
}

export interface EncounterLog {
    id: string;
    encounterId: string;
    deltas: EncounterDelta[]; // ordered list of diffs
}

// encounterLog: EncounterDelta[];
// can it be both a record of what happened for textifying combat, and a time-travel tool?

// EncounterDelta may be associated with a turn, or could be dynamic (happening 'between' turns like Initiative roll @ start of round or new Enemies appearing)

// type Pick<T, K extends keyof T> = {
//     [P in K]: T[P];
// };

// const ed: EncounterDelta<"currentRound"> = {
//     round: 1,
//     time: 0,
//     // modifyProperty: "currentRound",
//     // modifyFn: ""
// }

// type EncounterDeltaKeys = keyof Omit<Encounter, 'id' | 'name' | 'sessionIds' | 'campaignId'>;
export interface EncounterDelta {
    delta: Delta | undefined;
    note: string; // A short summary note of what happened
    // modifyProperty: T;
    // modifyFn(t: Encounter[T]): Encounter[T];
    // would have to contain modifications to any property of the "Encounter" object. (some are deeply nested though, like a player expending a spell slot)
    // plus a custom DM Note of what happened that turn 
    // but that still wouldn't allow an easy walk-back undo of that object... unless the object is _only_ ever built as a "sum" of these deltas 
    // and then we could memoize (?) the sum of any given [[]] of the object
}

export interface ConditionInstance {
    type: enums.Condition;
    name: string; // if Other
    indefinite: boolean;
    turnsRemaining?: number;
    untilTurnId?: string;
    untilTurnPart?: enums.TurnPart;
}

export interface CreatureGroup {
    instanceId: string;
    name: string;
    alignment: enums.CreatureGroupAlignment;
    color: string;
}

export interface Creature {
    id: string;
    campaignId: string;
    maxHP: number;
    defense: number;
    name: string;
    imageUrl: string;
    maxSpellSlots: number[];
    classLevels: ClassLevel[];
    description: string;
    statBlock: string;
    unique: boolean;
}

export interface ClassLevel {
    level: number;
    class: enums.Class;
    className: string; // if Other
}
export interface Player extends Creature {
    playerId: string;
}

export interface CreatureInstanceMetaData {
    type: enums.CreatureType;
    instanceId: string;
    currentHP: number;
    tempHP: number;
    encounterNotes: string;
    availableSpellSlots: number[];
}

export type CreatureInstance = Creature & CreatureInstanceMetaData;
export type PlayerInstance = Player & CreatureInstanceMetaData;

// we ONLY store "*-Instance"s in an Encounter,
// otherwise a character's Level, spell slots etc etc would be wrong looking back at the Encounter later

// we store the "sourceId" just so it can be backreferenced later to see what combats the character has participated in, etc

// but when we create an instance of the Character, we copy in all the current info from it and just operate on that clone from there on out!



// export type GetAllChatrooms = ChatroomWithInfo[];
// export type GetLatestMessagesForChatroom = ChatroomMessage[];

// export type ChatroomMessage = (Omit<db.message.Schema, 'chatroom_sentto' | 'user_sentby'> & {
//     user_sentby: db.user.Schema;
// });

// export type ChatroomWithInfo = db.chatroom.Schema & {
//     mostRecentMessage?: {
//         content: string;
//         sentBy: string;
//         _id: string;
//     }
// };

// export interface NewRoomRequest {
//     name: db.chatroom.Schema['name'];
// }

// export interface NewMessageRequest {
//     content: db.message.Schema['content'];
// }

export interface LoginRequest {
    username: db.user.Schema['username'];
}

export interface GoogleOAuthRequest {
    token: string;
}

export interface NewCampaignForm {
    name: string;
    description: string;
    imageUrl: string;
}

export type NewCampaignRequest = NewCampaignForm;
export type AllCampaignsRequest = Pick<db.campaign.Schema, 'user_createdby'>;
export type CampaignRequest = Pick<db.campaign.Schema, '_id'>;
export type Request<T = Record<string, any>> = Omit<express.Request, 'body'> & { body: T };