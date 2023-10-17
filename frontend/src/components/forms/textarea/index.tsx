import './style.scss';
import classNames from 'classnames';
import { FunctionalComponent, h } from 'preact';
import { useRef } from 'preact/hooks';
import { FormProps } from '../form-props';

export type FormTextAreaProps<T> = FormProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'maxLength'> | 'value' | 'size'> & {
    value: T;
    onChange: (t?: T) => void;
    onBlur: () => void;
    isError: boolean;
}

export const FormTextArea: FunctionalComponent<FormTextAreaProps<string>> = ({ value, onChange, onBlur, isError, ...props }) => {
    const textareaEl = useRef<HTMLTextAreaElement>(null);
    const handleChange = () => {
        onChange(textareaEl.current?.value);
    };
    return (
        <textarea 
            {...props}
            className={`form-textarea ${classNames({
                'form-textarea--error': isError,
            })}`}
            type='text'
            value={value}
            ref={textareaEl}
            onChange={handleChange}
            onBlur={onBlur} />
    );
};
