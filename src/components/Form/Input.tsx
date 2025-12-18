import "./Input.css";
import BaseProps from "../props";
interface InputProps extends BaseProps {
    name?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    required?: boolean;
}

function Input({ name, type, placeholder, value, required }: InputProps) {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            required={required}
        />
    );
}

export function Email({ required, value }: InputProps) {
    return (
        <input name="email" type="email" placeholder="email@example.com" value={value} required={required} />
    );
}

export function Phone({required, value }: InputProps) {
    return (
        <input name="phone" type="tel" placeholder="(123) 456-7890" value={value} required={required} />
    );
}

export function Text({ name, placeholder, value, required }: InputProps) {
    return (
        <input name={name} type="text" placeholder={placeholder} value={value} required={required} />
    );
}

export function FirstName ({ required, value }: InputProps) {
    return (
        <input name="firstName" type="text" placeholder="John" value={value} required={required} />
    );
}

export function LastName ({ required, value }: InputProps) {
    return (
        <input name="lastName" type="text" placeholder="Doe" value={value} required={required} />
    );
}

