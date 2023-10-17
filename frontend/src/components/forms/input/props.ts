import { FormProps } from '../form-props';

export type FormInputProps<T> = FormProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof Omit<React.HTMLAttributes<HTMLInputElement>, 'placeholder'> | 'value' | 'size'> & {
    value: T;
    onChange: (t?: T) => void;
    onBlur: () => void;
    isError: boolean;
    size?: 'medium' | 'large' | 'elastic';
}
