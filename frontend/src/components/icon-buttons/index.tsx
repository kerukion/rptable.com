import './style.scss';
import classNames from 'classnames';
import { FunctionalComponent, h } from 'preact';
import { FormButton, FormButtonProps } from '../forms';

type IconTypes =
    | '/assets/icons/pencil.svg'
    | '/assets/icons/checkmark.svg'
    | '/assets/icons/close.svg'
    ;

type IconButtonProps = Exclude<FormButtonProps, 'size'> & {
    icon: IconTypes;
    light?: boolean;
}

export const IconButton: FunctionalComponent<IconButtonProps> = ({ icon, light = true, ...props }) => {
    const iconsToShrink: IconTypes[] = ['/assets/icons/pencil.svg'];
    return (
        <FormButton size='fit' kind='action' {...props}>
            <img
                className={classNames({
                    'icon-button': true,
                    small: iconsToShrink.includes(icon),
                    light,
                })}
                src={icon}
                alt='' />
        </FormButton>
    );
};
