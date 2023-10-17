import { FunctionalComponent, h } from 'preact';
import { useRef } from 'preact/hooks';
import classNames from 'classnames';
import './style.scss';
import { FormInputProps } from './props';

export * from './number'
export const FormInput: FunctionalComponent<FormInputProps<string>> = ({ value, onChange, onBlur, isError, isTouched, size, ...props }) => {
    const inputEl = useRef<HTMLInputElement>(null);
    const handleChange = () => {
        onChange(inputEl.current?.value)
    };
    return (
        <input 
            {...props}
            className={`form-input ${classNames({
                'form-input--medium': size === 'medium',
                'form-input--large': size === 'large',
                'form-input--elastic': size === 'elastic',
                'form-input--error': isError && isTouched,
            })}`}
            type="text"
            value={value}
            ref={inputEl}
            onChange={handleChange}
            onBlur={onBlur} />
    )
};
