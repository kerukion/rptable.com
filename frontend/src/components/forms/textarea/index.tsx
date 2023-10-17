import './style.scss';
import classNames from 'classnames';
import { FunctionalComponent, h } from 'preact';
import { useRef } from 'preact/hooks';
import { FormProps } from '../form-props';

type Sizes = 'elastic' | 'medium' | 'x-large';

export type FormTextAreaProps<T> = FormProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'maxLength'> | 'value' | 'size'> & {
    value: T;
    onChange: (t?: T) => void;
    onBlur: () => void;
    isError: boolean;
    size?: Sizes;
}

export const FormTextArea: FunctionalComponent<FormTextAreaProps<string>> = ({
    value,
    onChange,
    onBlur,
    isError,
    size = 'medium',
    ...props }) => {
    const textareaEl = useRef<HTMLTextAreaElement>(null);
    const handleChange = () => {
        onChange(textareaEl.current?.value);
    };
    return (
        <textarea
            {...props}
            className={`form-textarea form-textarea--${size} ${classNames({
                'form-textarea--error': isError,
            })}`}
            type='text'
            value={value}
            ref={textareaEl}
            onChange={handleChange}
            onBlur={onBlur} />
    );
};
