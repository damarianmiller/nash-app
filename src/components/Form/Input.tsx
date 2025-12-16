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
        <input name="email" type="email" placeholder="Email Address" value={value} required={required} />
    );
}

