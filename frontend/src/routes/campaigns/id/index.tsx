import './style.scss';
import classNames from 'classnames';
import { Fragment, FunctionalComponent, h } from 'preact';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { useDispatch } from 'react-redux';
import { core } from '~core';
import { db } from '~db';
import { AppLink, FormButton, FormError, FormInput, FormTextArea, IconButton, SessionCard } from '~frontend/components';
import { useCampaignQuery } from '~frontend/queries';
import { actions } from '~frontend/store';
import { CampaignFormUtil } from '../new/campaign-form';

// TODO: finishing "Campaign Edit flow"

interface CampaignProps {
    id?: string;
}

const TABS = ['Sessions', 'Campaign Editor'] as const;
type ValueOf<T> = T[keyof T];
type Tabs = ValueOf<typeof TABS>;

export const Campaign: FunctionalComponent<CampaignProps> = (props) => {
    const dispatch = useDispatch();
    const { data: campaign, isLoading } = useCampaignQuery(props.id);
    console.log('CAMPAIGN RERENDER', campaign);
    const [tab, setTab] = useState<Tabs>('Sessions');
    const [session, setSession] = useState<core.Session | null>(null);
    const [editing, setEditing] = useState(false);
    // const [rename, setRename] = useState<string>('');
    // const [redescription, setRedescription] = useState<string>('');
    const {
        controls,
        trigger,
        errors,
        isValid,
        formValues,
        setImageLoaded,
        errorMapping,
        reset,
    } = CampaignFormUtil.new();

    useEffect(() => {
        reset(campaign);
    }, [reset, campaign]);

    const updateImageLoaded = useCallback((bool: boolean) => {
        setImageLoaded(bool);
        trigger('imageUrl');
    }, [setImageLoaded, trigger]);


    const toggleEdit = (edit: boolean) => {
        reset(campaign);
        setEditing(edit);
    };

    const mockSessions: core.Session[] = useMemo(() => [
        {
            id: '1',
            campaignId: '1',
            name: 'Capital',
            description: 'asd',
            number: 67,
        },
        {
            id: '2',
            campaignId: '1',
            description: 'asd',
            name: 'Tethers',
            number: 68,
        },
        {
            id: '3',
            campaignId: '1',
            description: 'asd',
            name: 'Enigmas',
            number: 69,
        },
    ], []);

    dispatch(actions.campaign.set({ value: props.id }));

    if (isLoading) {
        return null;
    }

    return (
        <div className='campaign'>
            <div className='campaign--header'>
                {/* <img className='campaign--img' src={campaign?.imageUrl} /> */}
                <img className='campaign--img'
                    src={formValues().imageUrl}
                    onLoad={() => updateImageLoaded(true)}
                    onError={() => updateImageLoaded(false)} />
                <div className='campaign--info'>
                    {!editing ?
                        (<Fragment>
                            <h2>{campaign?.name}</h2>
                            <p>{campaign?.description}</p>
                        </Fragment>) :
                        (<Fragment>
                            <div className='campaign-edit--name'>
                                <FormInput
                                    maxLength={100}
                                    size='large'
                                    placeholder='Campaign Name'
                                    isDisabled={false}
                                    isError={!!errors.name}
                                    {...controls.name.field} />
                                <FormError
                                    error={errors.name}
                                    mapping={errorMapping.name} />
                            </div>
                            <div className='campaign-edit--description'>
                                <FormTextArea
                                    size='x-large'
                                    maxLength={500}
                                    isDisabled={false}
                                    isError={!!errors.description}
                                    {...controls.description.field} />
                                <FormError
                                    error={errors.description}
                                    mapping={errorMapping.description} />
                            </div>
                            <div className='campaign-edit--imageUrl'>
                                <FormInput
                                    maxLength={500}
                                    size='x-large'
                                    isDisabled={false}
                                    isError={!!errors.imageUrl}
                                    {...controls.imageUrl.field} />
                                <FormError
                                    error={errors.imageUrl}
                                    mapping={errorMapping.imageUrl} />
                            </div>
                        </Fragment>)
                    }
                </div>
                {tab === 'Campaign Editor' && !editing && (
                    <div className='campaign--actions'>
                        <IconButton onClick={() => toggleEdit(true)} icon='/assets/icons/pencil.svg' />
                    </div>
                )}
                {editing && (
                    <div className='campaign--actions'>
                        <IconButton kind='submit' light={false} onClick={() => toggleEdit(false)} icon='/assets/icons/checkmark.svg' />
                        <IconButton kind='misc' onClick={() => toggleEdit(false)} icon='/assets/icons/close.svg' />
                    </div>
                )}
            </div>
            <div className='tab-group'>
                {TABS.map((t) => (
                    <button key={t}
                        className={`tab ${classNames({ active: tab === t })}`}
                        onClick={() => setTab(t)}>
                        {t}
                    </button>
                ))}
            </div>
            {/* {JSON.stringify(campaign)} */}
            {/* goes to view where you can add characters and locations */}
            {/* 
            LEFT SIDE:
                List of cards in a column box... 
                    Header: Session # and name
                    Body: Session description, short
                    "Tags": show top-level locations used in Session. This is COMPUTED, not set.
                    "Category": "Social/combat/story". This is SET (checkboxes)
            */}
            {/* 
            RIGHT SIDE:
                Full session details and editable inline
                Shows encounters

            */}
            {
                tab === 'Sessions' && (
                    <div className='sessions'>
                        <div className='session-list'>
                            {mockSessions.map((s) => <SessionCard key={s.id} session={s} onSelect={() => setSession(s)} />)}
                        </div>
                        {!session
                            ? (<div>
                                Choose a session
                            </div>)
                            : (<div className='session-view'>
                                <h2 className='session-title'>
                                    Session #{session.number}: {session.name}
                                </h2>
                                {/* Tags: [tags] */}
                                <p className='session-description'>{session.description}</p>
                                <AppLink href='/encounters/new'>
                                    <FormButton kind='action'>
                                        + New Encounter
                                    </FormButton>
                                </AppLink>
                            </div>)
                        }
                    </div>
                )
            }
            {
                tab === 'Campaign Editor' && (
                    <div className='campaign-editor'>
                        here we need ...
                        add characters. add locations.
                        also has a button to launch a view for editing the basic campaign fields
                    </div>
                )
            }
        </div >
    );
};
