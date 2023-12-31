import './style.scss';
import classNames from 'classnames';
import { FunctionalComponent, h } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { FormProps } from '../form-props';

type FormSelectProps<T, K> = FormProps & {
    mapToKey?: (t: T) => K;
    value: K;
    onBlur?: () => void;
    onChange?: (t: K) => void;
    options: T[] | undefined;
    render?: (t: T) => JSX.Element | string;
    size?: 'medium' | 'large';
}

export * from './multiselect';
export const FormSelect = <T, K,>({
    value,
    isError,
    isDisabled,
    options,
    size,
    onChange = () => null,
    onBlur = () => null,
    render = (a) => a as unknown as string,
    mapToKey = (a) => a as unknown as K,
}: FormSelectProps<T, K>): ReturnType<FunctionalComponent<FormSelectProps<T, K>>> => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const shouldDisable = isDisabled || !options || options.length === 0;

    useEffect(() => {
        if (shouldDisable) {
            if (open) {
                setOpen(false);
                onBlur();
            }
        }
    }, [open, setOpen, shouldDisable, onBlur]);

    const toggleSelect = useCallback(() => {
        if (shouldDisable) {
            return;
        }

        if (open) {
            setOpen(false);
            onBlur();
        } else {
            setOpen(true);
        }
    }, [onBlur, open, setOpen, shouldDisable]);

    const chooseOption = (option: T) => {
        if (shouldDisable) {
            return;
        }

        toggleSelect();
        onChange(mapToKey(option));
    };

    const clickOut = useCallback((evt: MouseEvent) => {
        if (ref.current?.contains(evt.target as Node)) {
            return;
        }
        if (open) {
            toggleSelect();
        }
    }, [toggleSelect, open]);

    useEffect(() => {
        document.body.addEventListener('mousedown', clickOut);
        return () => {
            document.body.removeEventListener('mousedown', clickOut);
        };
    }, [clickOut]);

    const renderCurrent = () => {
        if (!options || !value) {
            return null;
        }
        const current = options.find(o => mapToKey(o) === value);
        if (!current) {
            return null;
        }
        return render(current);
    };

    return (
        <div
            tabIndex={0}
            ref={ref}
            className={`form-select ${classNames({
                'form-select--error': isError,
                'form-select--large': size === 'large',
                'form-select--open': open,
                'form-select--disabled': shouldDisable,
            })}`}>
            <div className='select-box' onClick={() => toggleSelect()}>
                {renderCurrent()}
                <span className='select-box--caret'>▼</span>
            </div>
            {open && (
                <div className='select-dropdown'>
                    {options?.map((o) => (
                        <div key={mapToKey(o)} className='select-option' onClick={() => chooseOption(o)}>
                            <span>{render(o)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
