import './style.scss';
import classNames from 'classnames';
import { FunctionalComponent, h } from 'preact';
import {  useMemo, useRef, useState } from 'preact/hooks';
import { ColorResult,GithubPicker } from 'react-color';
import { core } from '~core';
import { FormInput } from '..';

interface CreatureGroupProps {
    group: core.CreatureGroup;
    active: boolean;
    deletable: boolean;
    editable: boolean;
    onClick: () => void;
    onDelete: () => void;
    onEdit: (cg: core.CreatureGroup) => void;
}

export const GroupCard: FunctionalComponent<CreatureGroupProps> = ({
    group,
    active,
    deletable,
    editable,
    onClick,
    onDelete,
    onEdit,
    ...props
}) => {
    const [open, setOpen] = useState(true);
    const [editing, setEditing] = useState(false);
    const [rename, setRename] = useState<string>(group.name);
    const [recolor, setRecolor] = useState<string>(group.color);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const toggleEdit = (edit: boolean) => {
        setRename(group.name);
        setRecolor(group.color);
        setEditing(edit);
    }

    const { toggleColorPicker } = useMemo(() => {
        // useMemo because these functions are co-dependent
        const clickOut = (evt: MouseEvent) => {
            if (ref.current?.contains(evt.target as Node)) {
                return;
            }
            toggleColorPicker(false);
        };
        const toggleColorPicker = (open: boolean) => {
            if (open) {
                document.body.addEventListener('mousedown', clickOut);
            } else {
                document.body.removeEventListener('mousedown', clickOut);
            }
            setShowColorPicker(open);
        };
        return { toggleColorPicker };
    }, [setShowColorPicker, ref]);

    return (
        <div className='creature-group'>
            {!editing && (
                <div onClick={onClick} className={`group-card ${classNames({ 'group-card--active': active })}`}>
                    <span className='group-card--color' style={`background-color: ${group.color}`} />
                    <button className='group-card--toggle' onClick={(e) => {
                        e.stopPropagation();
                        setOpen(!open)
                    }}>
                        <img className='arrow-icon' src={'/assets/icons/chevron-down.svg'} alt='' />
                    </button>
                    <h1 className='group-card--name'>{group.name}</h1>
                    {editable && (<button className="group-card--edit" onClick={(e) => {
                        e.stopPropagation()
                        toggleEdit(true)
                    }}>
                        <img className='pencil-icon' src={'/assets/icons/pencil.svg'} alt='' />
                    </button>)}
                    {deletable && (<button className="group-card--delete" onClick={(e) => {
                        e.stopPropagation()
                        onDelete()
                    }}>
                        <img className='close-icon' src={'/assets/icons/close.svg'} alt='' />
                    </button>)}
                </div>
            )}
            {editing && (
                <div className={`group-card group-card--editing ${classNames({ 'group-card--active': active })}`}>
                    <div className='group-card--editing-color'>
                        <span className='group-card--color' style={`background-color: ${recolor}`} onClick={() => toggleColorPicker(!showColorPicker)}>
                            <button className="group-card--edit-color">
                                <img className='color-icon' src={'/assets/icons/water.svg'} alt='' />
                            </button>
                        </span>
                        {showColorPicker && 
                        (<div 
                            ref={ref} 
                            className="group-card--color-picker">
                            <GithubPicker width="112px" onChangeComplete={(color: ColorResult) => {
                                toggleColorPicker(false);
                                setRecolor(color.hex);
                            }} />
                        </div>)}
                    </div>
                    <div className='group-card--edit-name'>
                        <FormInput
                            size="elastic"
                            isError={false}
                            isDisabled={false}
                            isTouched={false}
                            value={rename}
                            onChange={(v) => { setRename(v || '') }}
                            onBlur={() => null}
                        />
                    </div>
                    <button className="group-card--done" onClick={(e) => {
                        e.stopPropagation()
                        toggleEdit(false)
                        onEdit({...group, name: rename, color: recolor})
                    }}>
                        <img className='checkmark-icon' src={'/assets/icons/checkmark.svg'} alt='' />
                    </button>
                </div>
            )}
            <div className={`children ${classNames({ 'children--show': open })}`}>
                {props.children}
            </div>
        </div>
    );
};