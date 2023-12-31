import './style.scss';
import { FunctionalComponent,h } from 'preact';
import { FieldError } from 'react-hook-form';

export interface FormErrorProps {
    error?: FieldError | FieldError[];
    mapping: Record<string, string>;
}

export const FormError: FunctionalComponent<FormErrorProps> = ({ error, mapping}) => {
    const wrapped = (() => {
        if (!error) {
            return undefined;
        }
        return Array.isArray(error) ? error : [error as FieldError];
    })();

    if (!wrapped || wrapped.every(e => !e.type)) {
        return (<p className='form-error' />);
    }
    return (<p className='form-error'>
        {wrapped.map(e => {
            return mapping[e.type] || e.message;
        })}
    </p>);
};