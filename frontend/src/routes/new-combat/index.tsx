import './style.scss';
import { FunctionalComponent, h } from 'preact';
import { core } from '~core';
import { useController, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreatureCard, FormButton, FormError, FormInput, FormInputNumber, FormMultiSelect, FormSelect, GroupCard } from '~frontend/components';
import { useMemo, useState } from 'preact/hooks';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import debounce from 'debounce';
import { InstanceCreatureMap } from '../../../../core/models';

export const NewCombat: FunctionalComponent = () => {
    // const CHARACTER_GROUP_LIMIT = 10;
    // const CHARACTER_LIMIT = 40;
    // const CREATURE_LIMIT = 40;
    // const PLAYER_LIMIT = 10;

    // TODO:
    // enforce char/crea/player limit
    // add bottom tray button for "Start" (must check validation)
    // load all data (still hardcoded) from the mocked backend API (just thru React Query, no backend).
    // 

    // interface NewEncounterRequest {
    // has RICH data
    // }
    // send the _FULL_ "instanced" players/characters/creatures w/ the APIRequest and store them directly as part of the encounter's data

    // move default groups to a "constants" file
    // add "index" to CGL so they can be sorted while in edit mode? LATER

    console.log('top level render...')

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

    const players: core.Player[] = [
        {
            id: '1',
            campaignId: '1',
            playerId: '1',
            classLevels: [{
                level: 12,
                class: core.Class.ROGUE,
                className: 'Rogue',
            }],
            unique: true,
            maxHP: 22,
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
            unique: true,
            maxHP: 143,
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
            unique: true,
            maxHP: 134,
            defense: 20,
            name: 'Raclorn Boulderthor',
            imageUrl: 'https://www.dndbeyond.com/avatars/21051/957/1581111423-60196211.jpeg?width=150&height=150&fit=crop&quality=95&auto=webp',
            maxSpellSlots: [4, 3, 3, 1],
            description: '',
            statBlock: ''
        }
    ];
    const characters: core.Creature[] = [
        {
            id: '4',
            campaignId: '1',
            classLevels: [{
                level: 3,
                class: core.Class.ROGUE,
                className: 'Rogue',
            }],
            unique: true,
            maxHP: 20,
            defense: 14,
            name: 'Lucy of Sapstop',
            imageUrl: 'https://www.dndbeyond.com/avatars/thumbnails/17/179/60/60/636377835623886578.jpeg',
            maxSpellSlots: [],
            description: '',
            statBlock: ''
        },
        {
            id: '5',
            campaignId: '1',
            classLevels: [
                {
                    level: 5,
                    class: core.Class.FIGHTER,
                    className: 'Fighter',
                }
            ],
            unique: true,
            maxHP: 44,
            defense: 16,
            name: 'Edric Batten, Sgt.',
            imageUrl: 'https://www.dndbeyond.com/avatars/17/204/636377839475886288.jpeg?width=150&height=150&fit=crop&quality=95&auto=webp',
            maxSpellSlots: [],
            description: '',
            statBlock: ''
        },
        {
            id: '6',
            campaignId: '1',
            classLevels: [{
                level: 10,
                class: core.Class.WARLOCK,
                className: 'Warlock',
            }],
            unique: true,
            maxHP: 73,
            defense: 10,
            name: 'Manfred Summerfield',
            imageUrl: 'https://www.dndbeyond.com/avatars/thumbnails/21234/196/60/60/1581111423-60740217.jpeg',
            maxSpellSlots: [0, 0, 0, 0, 2],
            description: '',
            statBlock: ''
        }
    ];
    const creatures: core.Creature[] = [
        {
            id: '7',
            campaignId: '1',
            maxHP: 39,
            defense: 14,
            name: 'Duergar Mind Master',
            imageUrl: 'https://www.dndbeyond.com/avatars/thumbnails/277/761/100/100/636601888754529457.jpeg',
            maxSpellSlots: [],
            classLevels: [],
            description: '',
            statBlock: '',
            unique: false,
        },
        {
            id: '8',
            campaignId: '1',
            maxHP: 39,
            defense: 18,
            name: 'Duergar Stone Guard',
            imageUrl: 'https://www.dndbeyond.com/avatars/thumbnails/322/330/100/100/636623501424615551.jpeg',
            maxSpellSlots: [],
            classLevels: [],
            description: '',
            statBlock: '',
            unique: false,
        }
    ]
    const campaignCreatures: core.CampaignCreatureMap = {
        [core.CreatureType.PLAYER]: players,
        [core.CreatureType.CHARACTER]: characters,
        [core.CreatureType.CREATURE]: creatures,
    };

    interface NewEncounterForm {
        name: string;
        campaignId: core.Campaign['id'];
        sessionIds: core.Session['id'][];
        currentSessionId: core.Session['id'];
        locationIds: core.Location['id'][];
        currentLocationId: core.Location['id'];
        currentRound: number;
    }

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
    const [combatantTab, setCombatantTab] = useState<core.CreatureType>(core.CreatureType.PLAYER);
    const [search, setSearch] = useState<string>('');
    const updateSearch = (s: string) => setSearch(s);
    const debouncedEventHandler = useMemo(() => {
        return debounce(updateSearch, 300)
    }, [setSearch]);

    const [instanceMap, setInstanceMap] = useState<core.InstanceCreatureMap>({
        [core.CreatureType.PLAYER]: {},
        [core.CreatureType.CHARACTER]: {},
        [core.CreatureType.CREATURE]: {},
    });
    const [creatureGroups, setCreatureGroups] = useState<core.CreatureGroup[]>([
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
        }
    ]);
    const [unsetCreatureGroup] = useState<core.CreatureGroup>({
        instanceId: uuidv4(),
        name: 'Ungrouped',
        alignment: core.CreatureGroupAlignment.NEUTRAL,
        color: '#fef3bd',
    });
    const [creatureGroupMapping, setCreatureGroupMapping] = useState<core.Encounter['creatureGroupMapping']>({});
    const [activeCreatureGroupId, setActiveCreatureGroupId] = useState<core.CreatureGroup['instanceId']>(unsetCreatureGroup.instanceId);
    const getAllInstances = (instances: core.InstanceCreatureMap): core.CreatureInstance[] => Object
        .values(core.CreatureType)
        .map(k => Object.values(instances[k]))
        .reduce((acc, cur) => [...acc, ...cur], []);

    const usedIds: core.Creature['id'][] = useMemo(() => {
        return getAllInstances(instanceMap).map((i) => i.id);
    }, [instanceMap]);

    const getInstancesForGroup = (instances: core.InstanceCreatureMap, cgId: core.CreatureGroup['instanceId']): core.CreatureInstance[] => 
        getAllInstances(instances)
        .filter(p => creatureGroupMapping[p.instanceId] === cgId)

    const groupCreatureInstance = (ci: core.CreatureInstanceMetaData['instanceId']) => {
        if (creatureGroups.find(cg => cg.instanceId === activeCreatureGroupId) == undefined && activeCreatureGroupId !== unsetCreatureGroup.instanceId) {
            throw Error('Cant add to non-existent group');
        }
        setCreatureGroupMapping({ ...creatureGroupMapping, [ci]: activeCreatureGroupId });
    };
    const addInstance = <T extends core.Creature>(c: T, type: core.CreatureType) => {
        const instance: T & core.CreatureInstanceMetaData = {
            ...c,
            type,
            currentHP: c.maxHP,
            tempHP: 0,
            encounterNotes: '',
            availableSpellSlots: c.maxSpellSlots,
            instanceId: uuidv4()
        };
        const newInstanceTypeMap = { ...instanceMap[type], [instance.instanceId]: instance };
        setInstanceMap({ ...instanceMap, [type]: newInstanceTypeMap });
        groupCreatureInstance(instance.instanceId);
    };

    type GroupList = core.CreatureGroup & { instances: (core.CreatureInstance | core.PlayerInstance)[] };
    const creatureGroupLists: GroupList[] = creatureGroups.map((cg) => ({
        ...cg,
        instances: getInstancesForGroup(instanceMap, cg.instanceId)
    }));

    const unsetGroupList: GroupList = {
        ...unsetCreatureGroup,
        instances: getInstancesForGroup(instanceMap, unsetCreatureGroup.instanceId),
    };

    const deleteGroupList = (gl: GroupList) => {
        let newCreatureGroupMapping = { ...creatureGroupMapping };
        gl.instances.forEach((i) => delete newCreatureGroupMapping[i.instanceId]);
        setCreatureGroupMapping(newCreatureGroupMapping);

        let newInstanceMap = { ...instanceMap };
        gl.instances.forEach((i) => {
            delete newInstanceMap[i.type][i.instanceId];
        });
        setInstanceMap(newInstanceMap);

        const newCreatureGroups = creatureGroups.filter(cg => cg.instanceId !== gl.instanceId);
        setCreatureGroups(newCreatureGroups);

        if (gl.instanceId === activeCreatureGroupId) {
            setActiveCreatureGroupId(unsetCreatureGroup.instanceId)
        }
    }

    const removeInstance = <T extends core.CreatureInstanceMetaData>(c: T) => {
        let newInstanceTypeMap = { ...instanceMap[c.type] };
        delete newInstanceTypeMap[c.instanceId];
        setInstanceMap({ ...instanceMap, [c.type]: newInstanceTypeMap });

        let newCreatureGroupMapping = { ...creatureGroupMapping };
        delete newCreatureGroupMapping[c.instanceId];
        setCreatureGroupMapping(newCreatureGroupMapping);
    };

    const groupLists = [unsetGroupList, ...creatureGroupLists];
    const searchIncludes = (name: string) => name.toLowerCase().includes(search.toLowerCase());
    const filterCreatures = <T extends core.Creature>(c: T) => {
        if (c.unique && usedIds.includes(c.id)) {
            return false;
        }
        return searchIncludes(c.name);
    }

    return (<div className='new-combat'>
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
            <div className='new-combat--combatants'>
                <h2 className='section-title'>Combatants</h2>
                <div className='section-body'>
                    <div className='combatant-adder'>
                        <div className="tab-group">
                            {Object.keys(core.CreatureType).map((k: core.CreatureType) => {
                                return (<button className={`tab ${classNames({ 'active': combatantTab === k })}`} onClick={() => setCombatantTab(k)}>{core.CreatureType[k]}</button>)
                            })}
                        </div>
                        <div className='combatant-tab-body'>
                            <div className="list-scroll-wrapper">
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
                                                onChange={(v) => { debouncedEventHandler(v || '') }}
                                                onBlur={() => { }}
                                            />
                                            <img className='search-icon' src={'/assets/icons/search.svg'} alt="" />
                                        </span>
                                    </div>
                                    <div className="card-list">
                                        {campaignCreatures[combatantTab].filter((c) => filterCreatures(c)).map(c =>
                                        (<div className="card-row">
                                            <CreatureCard creature={c} />
                                            <FormButton
                                                onClick={() => addInstance(c, combatantTab)}
                                                kind="action"
                                                size="small">
                                                Add
                                            </FormButton>
                                        </div>)
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='combatant-grouper'>
                        <div className='grouper-scroll-wrapper'>
                            <div className='add-new'>
                                <FormButton size="elastic" kind="action" onClick={() => {
                                    setCreatureGroups([...creatureGroups, {
                                        instanceId: uuidv4(),
                                        name: 'New Group',
                                        alignment: core.CreatureGroupAlignment.NEUTRAL,
                                        color: '#fef3bd',
                                    }])
                                }}>
                                    Add new Group
                                </FormButton>
                            </div>
                            {groupLists.map((cgl) => (
                                <GroupCard
                                    group={{ ...cgl }}
                                    deletable={cgl.instanceId !== unsetGroupList.instanceId}
                                    editable={cgl.instanceId !== unsetGroupList.instanceId}
                                    active={cgl.instanceId === activeCreatureGroupId}
                                    onClick={() => { setActiveCreatureGroupId(cgl.instanceId) }}
                                    onEdit={(newCg) => {
                                        const newCgs = [...creatureGroups].map((cg) => {
                                            if (cg.instanceId === newCg.instanceId) {
                                                return newCg;
                                            }
                                            return cg;
                                        });
                                        setCreatureGroups(newCgs);
                                    }}
                                    onDelete={() => { deleteGroupList(cgl) }}>
                                    {cgl.instances.map(c => (
                                        <div className="card-row">
                                            <CreatureCard creature={c} />
                                            <FormButton onClick={() => groupCreatureInstance(c.instanceId)}
                                                size="small"
                                                kind="action">
                                                Move
                                            </FormButton>
                                            <FormButton onClick={() => removeInstance(c)}
                                                size="fit"
                                                kind="delete">
                                                <img className='trash-icon' src={'/assets/icons/trash.svg'} alt="" />
                                            </FormButton>
                                        </div>
                                    ))}
                                </GroupCard>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};
