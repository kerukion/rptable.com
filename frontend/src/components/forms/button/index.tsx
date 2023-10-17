import './style.scss';
import { FormProps } from '../form-props';
import { FunctionalComponent, h } from 'preact';
import classNames from 'classnames';

export type FormButtonProps = FormProps 
    & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof React.HTMLAttributes<HTMLButtonElement> | 'value'> 
    & Pick<React.DOMAttributes<HTMLButtonElement>, 'onClick'>
    & {
    isDisabled?: boolean;
    size?: 'small' | 'medium' | 'large' | 'elastic';
    kind?: 'action';
}

export const FormButton: FunctionalComponent<FormButtonProps> = ({ isDisabled = false, size, kind, ...props }) => {
    return (
        <button
            {...props}
            onClick={(e) => {
                if(isDisabled) {
                    return;
                }
                props.onClick && props.onClick(e as any)
            }}
            className={`form-button ${classNames({
                'form-button--small': size === 'small',
                'form-button--medium': size === 'medium',
                'form-button--large': size === 'large',
                'form-button--elastic': size === 'elastic',
                'form-button--action': kind === 'action',
                'form-button--disabled': isDisabled,
            })}`}
            type="button" >
            {props.children}
        </button>
    )
};