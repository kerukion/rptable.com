import { h, FunctionalComponent } from "preact";
import { FieldError } from "react-hook-form";
import './style.scss';

export interface FormErrorProps {
    error?: FieldError | FieldError[];
    mapping: Record<string, string>;
    show: boolean;
}

export const FormError: FunctionalComponent<FormErrorProps> = ({ error, mapping, show}) => {
    const wrapped = (() => {
        if (!error) {
            return undefined;
        }
        return Array.isArray(error) ? error : [error as FieldError];
    })();

    if (!show || !wrapped || wrapped.every(e => !e.type)) {
        return (<p className="form-error"></p>);
    }
    return (<p className="form-error">
        {wrapped.map(e => {
            return mapping[e.type] || e.message
        })}
    </p>)
}