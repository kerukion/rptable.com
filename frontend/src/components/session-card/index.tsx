import './style.scss';
import { FunctionalComponent, h } from 'preact';
import { core } from '~core';
import { db } from '~db';
import { FormButton } from '../forms';

interface SessionCardProps {
    session: core.Session;
    onSelect: () => void;
}

export const SessionCard: FunctionalComponent<SessionCardProps> = ({ session, onSelect }) => {
    return (
        <div className='session-card'>
            <h3 className='session-card--title'>#{session.number}: {session.name}</h3>
            <p className='session-card--description'>
                {session.description}
            </p>
            <div className='session-card--actions'>
                <FormButton kind='action' 
                    onClick={onSelect}>
                    Select
                </FormButton>
            </div>
        </div>
    );
};