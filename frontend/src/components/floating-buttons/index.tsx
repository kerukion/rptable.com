import './style.scss';
import { FunctionalComponent, h } from 'preact';

export const FloatingButtons: FunctionalComponent<{ child: JSX.Element }> = ({ child, children }) => {
    return (
        <div className='floating-button-list'>
            <div className='child'>
                {child}
            </div>
            <div className='button-tray-wrapper'>
                <div className='button-tray-border'>
                    <div className='button-tray'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
