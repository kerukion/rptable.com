import './style.scss';
import classNames from 'classnames';
import { FunctionalComponent, h } from 'preact';
import { useRef } from 'preact/hooks';
import { FormInputProps } from './props';

export * from './number';
export const FormInput: FunctionalComponent<FormInputProps<string>> = ({ value, onChange, onBlur, isError, size, ...props }) => {
    const inputEl = useRef<HTMLInputElement>(null);
    const handleChange = () => {
        onChange(inputEl.current?.value);
    };
    return (
        <input 
            {...props}
            className={`form-input form-input--${size} ${classNames({
                'form-input--error': isError,
            })}`}
            type='text'
            value={value}
            ref={inputEl}
            onChange={handleChange}
            onBlur={onBlur} />
    );
};
