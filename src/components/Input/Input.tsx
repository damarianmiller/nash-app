import "./Input.css";
import BaseProps from "../props";
import Container from "../Container/Container";
import Icon from "../Icon/Icon";



interface InputProps extends BaseProps {
    type: string;
    name: string;
    placeholder: string;
    value?: string;
    label: string;
    required: boolean;
    pattern?: string;
}

export default function Input({ id, className, name, icon, type, placeholder, value, label, required, pattern}: InputProps) {
    const classNames = "app-input" + (className ? " " + className : "");
    return (
        <fieldset id={id} className={classNames}>
            {label && <legend>{label}</legend>}
            {icon && <Icon icon={icon[0]} size={icon[1]} />}
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                required={required}
                pattern={pattern}
            />
        </fieldset>
    );
}

export function Email({required}: Omit<InputProps, "type" | "name" | "placeholder" | "value" | "pattern">) {
    return (
        <Input type="email" name="email" icon={["at-sign", 20]} label="Email Address" placeholder="user@example.com" required={required} />
    );
}


export function Text({name, icon, label, placeholder, required}: Omit<InputProps, "type" | "value" | "pattern">) {
    return (
        <Input type="text" name={name} icon={icon} label={label} placeholder={placeholder} required={required} />
    );
}

interface RadioProps extends Omit<InputProps, "type" | "placeholder" | "value" | "label" | "pattern"> {
    name: string;
    required: boolean;
    radios: {label: string; value: string}[];
}

export function Radio({name, required, radios}: RadioProps) {
    return (
        <>
            {radios.map((radio, index) => (
                <Container key={index} flow="row" mainAxisAlign="start" crossAxisAlign="center" gap="s">
                    <Input type="radio" name={name} value={radio.value} label={radio.label} placeholder="" required={required} />
                </Container>
            ))}
        </>
    );
}