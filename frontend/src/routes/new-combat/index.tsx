import './style.scss';
import { FunctionalComponent, h } from 'preact';
import { core } from '~core';
import { useController, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CharacterCard, FormButton, FormError, FormInput, FormInputNumber, FormMultiSelect, FormSelect } from '~frontend/components';
import { useState } from 'preact/hooks';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

export const NewCombat: FunctionalComponent = () => {
    // const CHARACTER_GROUP_LIMIT = 10;
    // const CHARACTER_LIMIT = 40;
    // const CREATURE_LIMIT = 40;
    // const PLAYER_LIMIT = 10;

    const campaigns: core.Campaign[] = [{
        id: '1',
        name: 'The Rival Gods',
        description: "The world of Estrador, invaded by the magic of the Godlands, becomes the latest battlefield in the Far War of the Four Rival Gods.",
        imageUrl: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2020/04/Tyr.jpg?q=50&fit=crop&w=1400&dpr=1.5",
    }];
    const campaignIds = campaigns.map(c => c.id);
    const sessions: core.Session[] = [
        {
            id: '1',
            campaignId: '1',
            name: 'Capital',
            number: 67
        },
        {
            id: '2',
            campaignId: '1',
            name: 'Tethers',
            number: 68
        },
        {
            id: '3',
            campaignId: '1',
            name: 'Enigmas',
            number: 70
        }
    ];
    const sessionIds = sessions.map(s => s.id);
    const locations: core.Location[] = [
        {
            id: '1',
            campaignId: '1',
            parentLocationId: undefined,
            name: 'Estrador',
            description: 'The world of the campaign.'
        },
        {
            id: '2',
            campaignId: '1',
            parentLocationId: '1',
            name: 'Vale Estria',
            description: 'The human kingdom within Estrador'
        },
        {
            id: '3',
            campaignId: '1',
            parentLocationId: '2',
            name: 'The Inwilds',
            description: 'A wild, mostly unsettled forest that lies between the 3 cities of Vale Estria.'
        },
        {
            id: '4',
            campaignId: '1',
            parentLocationId: '2',
            name: 'Fairmont',
            description: 'The southeastern city of the Vale, ruled by Joy Lord Gerimund.'
        },
        {
            id: '5',
            campaignId: '1',
            parentLocationId: '4',
            name: 'The Perafort Dam',
            description: 'The remote fortress where dwarves manage the sophisticated dam powering Fairmont\'s industry.'
        },
        {
            id: '6',
            campaignId: '1',
            parentLocationId: '4',
            name: 'The Jubilee Stage',
            description: 'An abandoned amphitheatre and stagehouse where public plays were once enjoyed.'
        }
    ];
    const locationIds = locations.map(l => l.id);
    const players: core.PlayerCharacter[] = [
        {
            id: '1',
            campaignId: '1',
            playerId: '1',
            classLevels: [{
                level: 12,
                class: core.Class.ROGUE,
                className: 'Rogue',
            }],
            maxHP: 40,
            defense: 17,
            name: 'Marcus Perfidie',
            imageUrl: 'https://www.dndbeyond.com/avatars/20974/793/1581111423-59971659.jpeg?width=150&height=150&fit=crop&quality=95&auto=webp',
            maxSpellSlots: [],
            description: '',
            statBlock: ''
        },
        {
            id: '2',
            campaignId: '1',
            playerId: '1',
            classLevels: [
                {
                    level: 9,
                    class: core.Class.BARBARIAN,
                    className: 'Barbarian',
                },
                {
                    level: 4,
                    class: core.Class.BARD,
                    className: 'Bard',
                }
            ],
            maxHP: 142,
            defense: 15,
            name: 'Wargrob',
            imageUrl: 'https://www.dndbeyond.com/avatars/20970/384/1581111423-59958523.jpeg?width=150&height=150&fit=crop&quality=95&auto=webp',
            maxSpellSlots: [4, 3],
            description: '',
            statBlock: ''
        },
        {
            id: '3',
            campaignId: '1',
            playerId: '2',
            classLevels: [{
                level: 12,
                class: core.Class.PALADIN,
                className: 'Paladin',
            }],
            maxHP: 90,
            defense: 20,
            name: 'Raclorn Boulderthor',
            imageUrl: 'https://www.dndbeyond.com/avatars/21051/957/1581111423-60196211.jpeg?width=150&height=150&fit=crop&quality=95&auto=webp',
            maxSpellSlots: [4, 3, 3, 1],
            description: '',
            statBlock: ''
        }
    ];
    const [playerInstances, setPlayerInstances] = useState<core.PlayerCharacterInstance[]>([]);
    const addPlayerInstance = (p: core.PlayerCharacter) => {
        setPlayerInstances([
            ...playerInstances,
            {
                ...p,
                currentHP: p.maxHP,
                tempHP: 0,
                encounterNotes: '',
                availableSpellSlots: p.maxSpellSlots,
                instanceId: uuidv4()
            }
        ])
    }
    // const characterInstances: core.CharacterInstance[] = [];
    // const creatureInstances: core.CreatureInstance[] = [];
    // const inactiveInstanceIds: core.CreatureInstance['instanceId'][] = [];

    interface NewEncounterForm {
        name: string;
        campaignId: core.Campaign['id'];
        sessionIds: core.Session['id'][];
        currentSessionId: core.Session['id'];
        locationIds: core.Location['id'][];
        currentLocationId: core.Location['id'];
        currentRound: number;
        // playerInstanceIds: core.PlayerCharacterInstance['instanceId'][];
        // characterInstanceIds: core.CharacterInstance['instanceId'][];
        // creatureInstanceIds: core.CreatureInstance['instanceId'][];
        // creatureGroupIds: core.CreatureGroup['instanceId'][];
    }

    // interface NewEncounterRequest {
    // has RICH data
    // }


    // you can add players 1x (they appear removed from the original list via a filter), characters/creatures multiple times (no filtering.)
    // you can pick how many you add + see how many are in the scene already (shows up as a "badge") + gets sorted to the top of the dropdown

    // they actually get added to a non-form array that doesn't get reflected back to the dropdowns
    // so we can probably remove them from the YUP object
    // and just validate them separately (is there any validation to really do?)

    // send the _FULL_ "instanced" players/characters/creatures w/ the APIRequest and store them directly as part of the encounter's data

    const newEncounterSchema: yup.SchemaOf<NewEncounterForm> = yup.object({
        name: yup.string().required(),
        campaignId: yup.string().required().oneOf(campaignIds),
        sessionIds: yup.array().min(1).of(yup.string().required().oneOf(sessionIds)).required(),
        currentSessionId: yup.string().required().test(
            'oneOf',
            '',
            function (value?: string) {
                return !!value && (this.parent as NewEncounterForm).sessionIds.includes(value)
            }
        ),
        locationIds: yup.array().min(1).of(yup.string().required().oneOf(locationIds)),
        currentLocationId: yup.string().required().test(
            'oneOf',
            '',
            function (value?: string) {
                return !!value && (this.parent as NewEncounterForm).locationIds.includes(value)
            }
        ),
        currentRound: yup.number().required(),
        // playerInstanceIds: yup.array().max(PLAYER_LIMIT).of(yup.string().required()),
        // characterInstanceIds: yup.array().max(CHARACTER_LIMIT).of(yup.string().required()),
        // creatureInstanceIds: yup.array().max(CREATURE_LIMIT).of(yup.string().required()),
        // creatureGroupIds: yup.array().max(CHARACTER_GROUP_LIMIT).of(yup.string().required())
    });

    const errorMapping: { [key in keyof NewEncounterForm]: Record<string, string> } = {
        campaignId: {
            required: 'Field is required',
        },
        sessionIds: {
            min: 'Field is required',
            required: 'Field is required',
        },
        currentSessionId: {
            oneOf: 'This session must be added to select it',
            required: 'Field is required',
        },
        locationIds: {
            min: 'Field is required',
            required: 'Field is required',
        },
        currentLocationId: {
            oneOf: 'This location must be added to select it',
            required: 'Field is required',
        },
        // playerInstanceIds: {},
        // characterInstanceIds: {},
        // creatureInstanceIds: {},
        // creatureGroupIds: {},
        name: {
            required: 'Field is required',
        },
        currentRound: {
            typeError: 'Field is required',
            required: 'Field is required',
        },
    }

    const { control, trigger, formState: { errors } } = useForm<NewEncounterForm>({
        mode: 'all',
        resolver: yupResolver(newEncounterSchema),
    });

    const campaignIdController = useController({
        name: 'campaignId',
        control
    });
    const sessionIdsController = useController({
        name: 'sessionIds',
        control
    });
    const currentSessionIdController = useController({
        name: 'currentSessionId',
        control
    });
    const locationIdsController = useController({
        name: 'locationIds',
        control
    });
    const currentLocationIdController = useController({
        name: 'currentLocationId',
        control
    });
    const nameController = useController({
        name: 'name',
        control
    });
    const currentRoundController = useController({
        name: 'currentRound',
        control
    });

    const isSubmitting = false;
    const [combatantTab, setCombatantTab] = useState<core.CreatureInstanceType>(core.CreatureInstanceType.PLAYER);
    const [search, setSearch] = useState<string>('');

    return (
        <div className='new-combat'>
            <div className='new-combat--header'>
                <h1>Create an encounter</h1>
            </div>
            <div className='new-combat--body'>
                <div className='new-combat--details'>
                    <h2 className='section-title'>Details</h2>
                    <div className='form-row'>
                        <span className='form-label'>Campaign</span>
                        <FormSelect
                            options={campaigns}
                            mapToKey={(c) => c.id}
                            {...campaignIdController.field}
                            isDisabled={isSubmitting}
                            isError={!!errors.campaignId}
                            isTouched={campaignIdController.fieldState.isTouched}
                            size='large'
                            render={(option) => {
                                return `${option.name}`
                            }}
                        />
                        <FormError
                            error={errors.campaignId}
                            show={campaignIdController.fieldState.isTouched}
                            mapping={errorMapping.campaignId} />
                    </div>
                    <div className='form-row'>
                        <span className='form-label'>Sessions</span>
                        <FormMultiSelect
                            options={sessions}
                            mapToKey={(s) => s.id}
                            {...sessionIdsController.field}
                            onChange={(o) => {
                                sessionIdsController.field.onChange(o);
                                trigger('currentSessionId');
                            }}
                            isDisabled={isSubmitting}
                            isError={!!errors.sessionIds}
                            isTouched={sessionIdsController.fieldState.isTouched}
                            size='large'
                            render={(option) => {
                                return `Session #${option.number}: ${option.name}`;
                            }}
                        />
                        <FormError
                            error={errors.sessionIds}
                            show={sessionIdsController.fieldState.isTouched}
                            mapping={errorMapping.sessionIds} />
                    </div>
                    <div className='form-row'>
                        <span className='form-label'>Current Session</span>
                        <FormSelect
                            options={sessions.filter((s) => (sessionIdsController.field.value || []).includes(s.id))}
                            mapToKey={(s) => s.id}
                            {...currentSessionIdController.field}
                            isDisabled={isSubmitting}
                            isError={!!errors.currentSessionId}
                            isTouched={currentSessionIdController.fieldState.isTouched}
                            size='large'
                            render={(option) => {
                                return `Session #${option.number}: ${option.name}`;
                            }}
                        />
                        <FormError
                            error={errors.currentSessionId}
                            show={currentSessionIdController.fieldState.isTouched}
                            mapping={errorMapping.currentSessionId} />
                    </div>
                    <div className='form-row'>
                        <span className='form-label'>Locations</span>
                        <FormMultiSelect
                            options={locations}
                            mapToKey={(l) => l.id}
                            {...locationIdsController.field}
                            onChange={(o) => {
                                locationIdsController.field.onChange(o);
                                trigger('currentLocationId');
                            }}
                            isDisabled={isSubmitting}
                            isError={!!errors.locationIds}
                            isTouched={locationIdsController.fieldState.isTouched}
                            size='large'
                            render={(option) => {
                                return `${option.name}`
                            }}
                        />
                        <FormError
                            error={errors.locationIds}
                            show={locationIdsController.fieldState.isTouched}
                            mapping={errorMapping.locationIds} />
                    </div>
                    <div className='form-row'>
                        <span className='form-label'>Current Location</span>
                        <FormSelect
                            options={locations.filter((l) => (locationIdsController.field.value || []).includes(l.id))}
                            mapToKey={(l) => l.id}
                            {...currentLocationIdController.field}
                            isDisabled={isSubmitting}
                            isError={!!errors.currentLocationId}
                            isTouched={currentLocationIdController.fieldState.isTouched}
                            size='large'
                            render={(option) => {
                                return `${option.name}`
                            }}
                        />
                        <FormError
                            error={errors.currentLocationId}
                            show={currentLocationIdController.fieldState.isTouched}
                            mapping={errorMapping.currentLocationId} />
                    </div>
                    <div className='form-row'>
                        <span className='form-label'>Encounter Name</span>
                        <FormInput
                            maxLength={100}
                            size={'large'}
                            isDisabled={isSubmitting}
                            isError={!!errors.name}
                            isTouched={nameController.fieldState.isTouched}
                            {...nameController.field} />
                        <FormError
                            error={errors.name}
                            show={nameController.fieldState.isTouched}
                            mapping={errorMapping.name} />
                    </div>
                    <div className='form-row'>
                        <span className='form-label'>Current Round</span>
                        <FormInputNumber
                            maxLength={2}
                            isDisabled={isSubmitting}
                            isError={!!errors.currentRound}
                            isTouched={currentRoundController.fieldState.isTouched}
                            {...currentRoundController.field} />
                        <FormError
                            error={errors.currentRound}
                            show={currentRoundController.fieldState.isTouched}
                            mapping={errorMapping.currentRound} />
                    </div>
                </div>
                {/* select multiple: PlayerId[] (req Campaign) */}
                {/* select multiple: CharacterId[] (req Campaign) */}
                {/* select multiple: CreatureId[] (req Campaign) */}
                {/* organize players, creatures, characters into groups :: how? */}
                {/*     - 'unassigned column' using 'smallAvatar' */}
                {/*     - checkbox next to all avatars in each column. check desired boxes and then 'Move To' + dropdown: show creature groups as options. then unchecks all */}
                {/*     - column for each CreatureGroup */}
                {/*     - by default starts with 3 columns: 'Party', 'Enemies', 'Neutral' */}
                {/*     - each group can be deleted. Groups CAN be created empty, no problem. they might want it later*/}
                <div className='new-combat--combatants'>
                    <h2 className='section-title'>Combatants</h2>
                    <div className='section-body'>
                        <div className='combatant-adder'>
                            <div className="tab-group">
                                {Object.keys(core.CreatureInstanceType).map((k: core.CreatureInstanceType) => {
                                    return (<button className={`tab ${classNames({ 'active': combatantTab === k })}`} onClick={() => setCombatantTab(k)}>{core.CreatureInstanceType[k]}</button>)
                                })}
                            </div>
                            <div className='combatant-list'>
                                <div className='search-bar'>
                                    <span className='search-input'>
                                        <FormInput
                                            size="elastic"
                                            placeholder='Search...'
                                            isError={false}
                                            isDisabled={false}
                                            isTouched={false}
                                            value={search}
                                            onChange={(v) => { setSearch(v || '') }}
                                            onBlur={() => { }}
                                        />
                                        <img className='search-icon' src={'/assets/icons/search.svg'} alt="" />
                                    </span>
                                </div>
                                <div className="card-list">
                                    {/* 
                                    Slim Player Card -> {img, level(corner), maxHp, name} -> + button, gray out if id used
                                    Slim Char Card -> {...same} -> Short Input # (default 1) -> + button
                                    */}
                                    {players.map(p => {
                                        return (
                                            <div className="card-row">
                                                <CharacterCard character={p} />
                                                <FormButton
                                                    isDisabled={playerInstances.some(pi => pi.id === p.id)}
                                                    onClick={() => addPlayerInstance(p)}
                                                    kind="action"
                                                    size="small">
                                                    Add
                                                </FormButton>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='combatant-groups'>
                            <FormButton>
                                Add new Group
                            </FormButton>
                            {playerInstances.map(p => {
                                return (
                                    <div className="card-row">
                                        <CharacterCard character={p} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
