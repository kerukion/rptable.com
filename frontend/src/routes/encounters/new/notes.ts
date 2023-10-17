
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

    // let encounter: core.Encounter = {
    //     id: '1',
    //     locationName: 'Peradin Woods',
    //     sessionIds: ['68'],
    //     campaignId: '1',
    //     name: 'Duergar Ambush',
    //     currentRound: 1,
    //     currentTurn: 'N/A',
    //     characters: [],
    //     players: [],
    //     creatures: [],
    //     initiativeMapping: { },
    //     creatureGroups: [],
    //     creatureGroupMapping: {},
    //     conditionMapping: { },
    //     actionMapping: { },
    //     reactionMapping: {  },
    //     bonusActionMapping: {  },
    // };

    // must be logged in + have a session / campaign selected ?
    // must be logged in + can pick session/campaign in create if campaign and session aren't already selected


    // MUST have already chosen a campaign so all the other dependent data validation can be loaded.


    // how to save EntityInstanceIds, and map them? add an instanceId to each, so each one is a tuple when it gets saved as a Combat?
    /*
    playerIds: [['DBtemplateGuid', 'DBinstanceGuid']]
    and only the DBtemplateGuid is a "FK" (unenforced).
     */

    // const player


    // in terms of CREATE FORM
    // just need sourceIds, we can use a shim object of instanceId+sourceId+type to copy data from the clone, and only save it on actual creation, until then...

    // compute fleshed out "entities" from the form.encounterEntities + API data
    // this introduces a dependency on keeping that API Data[id] loaded... whereas immediately copying it all in makes that easier. fair enough. lets do that



    // interface EncounterEntity {
    //     instanceId: string;
    //     sourceId: string;
    //     type: core.enums.CreatureInstanceType;
    // }


    // const encounterInstanceSchema: yup.SchemaOf<core.EncounterInstances> = yup.object({
    //     instanceId: yup.string().required(),
    //     instanceType: yup.mixed<core.enums.CreatureInstanceType>().oneOf(Object.values(core.enums.CreatureInstanceType)).required()
    // });

    // but store these in local memory until API POST. for the form we only need to hold entity Id + type.
    // we don't want to deal with "validation" of each type inside Yup.
    // same for creatureGroups.


    // const creatureGroupsSchema: yup.object({
    //     instanceId: yup.string().required(),
    //     name: yup.string().required(),
    //     alignment: yup.number().required(),
    //     color: yup.string().required(),
    // });