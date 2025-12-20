import "./Input.css";
import BaseProps from "../props";
interface InputProps extends BaseProps {
    label?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    required?: boolean;
    pattern?: string;
}

export default function Input({ className, name, type, placeholder, value, required, pattern}: InputProps) {
    const classNames = "app-input" + (className ? " " + className : "");
    return (
        <input
            className={classNames}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            required={required}
            pattern={pattern}
        />
    );
}

export function Email({required}: InputProps) {
    return (
        <Input label="Email Address" type="email" name="email" placeholder="user@example.com" required={required} />
    );
}