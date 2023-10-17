import classNames from 'classnames';
import { FunctionalComponent, h } from 'preact';
import { useState, useRef, useEffect, useCallback } from 'preact/hooks';
import { FormProps } from '../form-props';

type FormMultiSelectProps<T, K> = FormProps & {
    mapToKey?: (t: T) => K;
    value: K[];
    options: T[] | undefined;
    onChange: (t: K[]) => void;
    onBlur: () => void;
    render: (t: T) => JSX.Element | string;
    size?: 'medium' | 'large';
}

export const FormMultiSelect = <T extends unknown, K extends unknown>({
    value,
    onChange,
    onBlur,
    isError,
    isTouched,
    isDisabled,
    options,
    size,
    render,
    mapToKey = (a) => a as K,
}: FormMultiSelectProps<T, K>): ReturnType<FunctionalComponent<FormMultiSelectProps<T, K>>> => {
    const [open, setOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState(new Set<K>())
    const [sortedOptions, setSortedOptions] = useState(options || []);
    const shouldDisable = isDisabled || sortedOptions.length === 0;

    useEffect(() => {
        if (shouldDisable) {
            if (previewOpen) {
                setPreviewOpen(false);
            }
            if (open) {
                setOpen(false);
                onBlur();
            }
        }
    }, [isDisabled, sortedOptions, previewOpen, setPreviewOpen, open, setOpen])

    useEffect(() => {
        const sorted = [...(options || [])].sort((o1, o2) => {
            if (selected.has(mapToKey(o1)) && !selected.has(mapToKey(o2))) {
                return -1;
            }
            if (!selected.has(mapToKey(o1)) && selected.has(mapToKey(o2))) {
                return 1;
            }
            return 0;
        });
        setSortedOptions(sorted);
    }, [setSortedOptions, open])

    const toggleSelect = useCallback(() => {
        if (shouldDisable) {
            return;
        }

        setPreviewOpen(false);
        if (open) {
            setOpen(false);
            onBlur();
        } else {
            setOpen(true);
        }
    }, [onBlur, open, setOpen, setPreviewOpen]);

    const toggleOption = (option: T) => {
        if (shouldDisable) {
            return;
        }

        if (!open) {
            setPreviewOpen(true);
        }
        const newSelected = (() => {
            let set = new Set(selected);
            if (set.has(mapToKey(option))) {
                set.delete(mapToKey(option));
            } else {
                set.add(mapToKey(option));
            }
            return set;
        })();
        setSelected(newSelected);
        onChange(Array.from(newSelected));
    };

    const clickOut = useCallback((evt: MouseEvent) => {
        if (ref.current?.contains(evt.target as Node)) {
            return;
        }
        if (open) {
            toggleSelect();
        } else if (previewOpen) {
            setPreviewOpen(false);
        }
    }, [toggleSelect, open, previewOpen]);

    useEffect(() => {
        document.body.addEventListener('mousedown', clickOut);
        return () => {
            document.body.removeEventListener('mousedown', clickOut);
        }
    }, [clickOut]);

    const renderCurrent = () => {
        if (!value?.[0]) {
            return null;
        }
        const current = sortedOptions.find(o => mapToKey(o) === value[0]);
        if (!current) {
            return null;
        }
        return render(current)
    }

    return (
        <div
            ref={ref}
            className={`form-select ${classNames({
                'form-select--error': isError && isTouched,
                'form-select--large': size === 'large',
                'form-select--open': open,
                'form-select--has-values': value && value.length >= 1,
                'form-select--preview-open': previewOpen,
                'form-select--disabled': shouldDisable,
            })}`}>
            <div tabIndex={0}
                className='select-box'
                onKeyDown={(event: KeyboardEvent) => {
                    if (['Enter'].includes(event.key)) {
                        toggleSelect();
                    }
                }}
                onClick={() => toggleSelect()}>
                {value && value.length === 1 && (<span>{renderCurrent()}</span>)}
                {value && value.length > 1 && (<span>{value.length} selected</span>)}
                <span className='select-box--caret'>▼</span>
            </div>
            <div className='select-preview'>
                {sortedOptions.filter(o => selected.has(mapToKey(o))).map(o => {
                    return (<div onClick={() => toggleOption(o)}
                        className='select-option select-option--preview select-option--chosen'>
                        <input type="checkbox" checked={true} />
                        <span>{render(o)}</span>
                    </div>);
                })}
            </div>
            {open && (
                <div className='select-dropdown'>
                    <div className='scroll-wrapper'>
                        {sortedOptions.map(o => {
                            return (<div onClick={() => toggleOption(o)}
                                className={`select-option ${classNames({
                                    'select-option--chosen': selected.has(mapToKey(o))
                                })}`}>
                                <input type="checkbox" checked={selected.has(mapToKey(o))} />
                                <span>{render(o)}</span>
                            </div>);
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
