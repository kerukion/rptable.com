import './style.scss';
import { FunctionalComponent, h } from 'preact';
import * as patcher from 'jsondiffpatch';
import { core } from '~core';
    
export const Combat: FunctionalComponent = () => {

    // don't track some things in Deltas:
        // name, locationName, locationId, sessionIds, campaignId

    /* Create encounter: 

    Set up the initial data in a form 
        - name, use current session and campaign
        - load places from session + expand for campaign
        - set current Round = 1(minimum) or # of rounds in if you wish, w/e
        - add creatures + characters + players OR create creatures/chars
        - optionally, create CreatureGroups for the combat and add creatures to it.
        - creature groups can be modified at any time in the combat.
          new creatures/chars/players can be added at any time to the combat.
          etc.
        - init all creatures in action/bonusaction/reaction/initiative/condition Maps
    */

    // in DB: store "Encounter" as sum of diffs + store all diffs
    // it's possible to undo changes by rolling back mid-combat,
    // whereupon you can add a Delta and then tab forward again, or save right there
    // but you must hit save there or at "jump back to current Turn", otherwise you remain
    // in a transient state where it stops saving to DB.
    // only save to DB every 5 mins when !not in transient editing state
    // which puts you in a transient state until you hit save to override the last saved encounterSum + deltas[]

    // don't allow rolling back the "kernel" delta unless deleting it.


    // const Marcus: core.PlayerCharacter = {
    //     id: '1',
    //     instanceId: '1',
    //     name: 'Marcus Perfidie',
    //     playerId: '1',
    //     level: 12,
    //     class: core.Class.ROGUE,
    //     className: 'Mastermind Rogue',
    //     currentHP: 10,
    //     maxHP: 22,
    //     tempHP: 0,
    //     campaignId: '1',
    //     imageUrl: '',
    //     maxSpellSlots: [],
    //     availableSpellSlots: [],
    //     description: '',
    //     statBlock: '',
    //     notes: ''
    // }
    // let encounter: core.Encounter = {
    //     id: '1',
    //     locationName: 'Peradin Woods',
    //     sessionIds: ['68'],
    //     campaignId: '1',
    //     name: 'Duergar Ambush',
    //     currentRound: 1,
    //     currentTurn: Marcus.id,
    //     characters: [],
    //     players: [Marcus],
    //     creatures: [],
    //     initiativeMapping: { [Marcus.id]: 10},
    //     creatureGroups: [],
    //     creatureGroupMapping: {},
    //     conditionMapping: { [Marcus.id]: []},
    //     actionMapping: { [Marcus.id]: core.ActionStates.HELD},
    //     reactionMapping: { [Marcus.id]: core.ActionStates.UNUSED },
    //     bonusActionMapping: { [Marcus.id]: core.ActionStates.USED },
    // };
    // const diff = patcher.diff({}, encounter);
    // const bootstrap: core.EncounterDelta = {
    //     delta: diff,
    //     note: 'Encounter created'
    // };
    // let encounterLog: core.EncounterLog = {
    //     id: '1',
    //     encounterId: '1',
    //     campaignId: '1',
    //     deltas: [bootstrap]
    // };

    // encounter.encounterLog = [bootstrap];

    // let newEncounter: core.Encounter = JSON.parse(JSON.stringify(encounter));
    // console.log(encounter, newEncounter);
    //modify
    // newEncounter.reactionMapping[Marcus.id] = core.ActionStates.USED;

    // //
    // var patch: Operation[] = [
    // { op: "replace", path: "/stuff/key1", value: "VALUE1" },
    // { op: "add", path: "/stuff/newkey", value: "newstuff" },
    // ];
    // document = jsonpatch.applyPatch(document, patch).newDocument;
    // let newEncounter: core.Encounter = JSON.parse(JSON.stringify(encounter));
    // // increment turn
    // newEncounter.currentRound++;
    // newEncounter.players.forEach((c) => {
    //     newEncounter.actionMapping[c.id] = core.ActionStates.UNUSED;
    //     newEncounter.bonusActionMapping[c.id] = core.ActionStates.UNUSED;
    //     newEncounter.reactionMapping[c.id] = core.ActionStates.UNUSED;
    // });
    // jsonpatch.applyPatch(newEncounter, );
    // const diff2 = patcher.diff(encounter, newEncounter);
    // console.log(encounter, newEncounter);
    // console.log(diff2);
    // console.log(patcher.unpatch(newEncounter, diff2!)) // skip (un)patch if undefined


    // must be logged in + have a session / campaign selected ?
    // must be logged in + can pick session/campaign in create if campaign and session aren't already selected

    return (
        <div className="combat">
            <div className="combat--title-bar">
                <h2>Encounter Tracker</h2>
            </div>
            <div>
                <button className="create">+ New Encounter</button>
                {/* <div>
                left side: turn order "chain" w/ Initiative number (editable), icon, health-bar under. 
                    character icon hover: show more details on left side
                    show indication which person's turn it is, and expand their details on their turn (name, icon bigger, outline, HP text)
                </div>
                <br />
                <div>
                right side: browse each character in the combat
                    top: add character from "Character List" associated w/ _Campaign_
                    middle: each character in a tray of (enemies / friends) 
                        show who has actions, reactions, bonus actions left to use.
                        show spell slots (expandable)
                        show link to source sheet (dndbeyond, 5esrd, etc)
                        show conditions list on each person
                    bottom-middle: 
                        turn trigger tracker (things like when spells expire or when planned events will happen)
                        *notify at top w/ a toast when things change like spells expire so you know to announce it to the table
                    bottom: dice roller (text field) that translates to WebGL dice rolls
                </div>
                <br />
                <div>
                middle: for now... nothing...
                    just list "place" + weather?
                    combat notes / encounter plan + turn triggers (linked to turn #)
                </div> */}
            </div>
        </div>
    );
};
