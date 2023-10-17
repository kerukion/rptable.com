

import classNames from 'classnames';
import { FunctionalComponent, h } from 'preact';
import { useRef } from 'preact/hooks';
import { FormInputProps } from './props';

export const FormInputNumber: FunctionalComponent<FormInputProps<number>> = ({ value, onChange, onBlur, isError, size, ...props }) => {
    const inputEl = useRef<HTMLInputElement>(null);
    const handleChange = () => {
        if (inputEl.current?.value) {
            inputEl.current.value = inputEl.current.value.replace(/[^0-9]/g, '');
        }
        const num = (() => {
            if (inputEl.current?.value) {
                return Number(inputEl.current.value);
            }
            return undefined;
        })();
        onChange(num);
    };

    return (
        <input 
            {...props}
            className={`form-input ${classNames({
                'form-input--medium': size === 'medium',
                'form-input--large': size === 'large',
                'form-input--elastic': size === 'elastic',
                'form-input--error': isError,
            })}`}
            type='text'
            value={value}
            ref={inputEl}
            onChange={handleChange}
            onBlur={onBlur} />
    );
};