import './style.scss';
import classNames from 'classnames';
import { FunctionalComponent, h } from 'preact';
import { FormProps } from '../form-props';

export type FormButtonProps = FormProps 
    & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof React.HTMLAttributes<HTMLButtonElement> | 'value'> 
    & Pick<React.DOMAttributes<HTMLButtonElement>, 'onClick'>
    & {
    isDisabled?: boolean;
    size?: 'fit' | 'small' | 'medium' | 'large' | 'elastic';
    kind?: 'action' | 'delete';
}

export const FormButton: FunctionalComponent<FormButtonProps> = ({ isDisabled = false, size, kind, ...props }) => {
    return (
        <button
            {...props}
            onClick={(e) => {
                if(isDisabled) {
                    return;
                }
                props.onClick && props.onClick(e as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>)
            }}
            className={`form-button ${classNames({
                'form-button--fit': size === 'fit',
                'form-button--small': size === 'small',
                'form-button--medium': size === 'medium',
                'form-button--large': size === 'large',
                'form-button--elastic': size === 'elastic',
                'form-button--action': kind === 'action',
                'form-button--delete': kind === 'delete',
                'form-button--disabled': isDisabled,
            })}`}
            type="button" >
            {props.children}
        </button>
    )
};
