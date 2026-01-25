import "./Input.css";
import { InputProps } from "@/Components/Props";
import Icon from "@/Components/Icons/Icon";
import Wrapper from "@/Components/Containers/Wrapper";

export function InputField(props: InputProps) {
    const { size, className, ...inputProps } = props;
    const classNames = "app-input" + (className ? " " + className : "") + (size ? " size-" + size : "");

    return (
        <input {...inputProps} className={classNames} />
    );
}
    
export default function Input(props: InputProps) {
    const { size, icon, className, ...inputProps } = props;
    const classNames = "app-input" + (className ? " " + className : "") + (size ? " size-" + size : "");
    return (
        <div {...inputProps} className={classNames}>
            {icon && <Icon size={size} name={icon} />}
            <input {...inputProps} size={14} />
        </div>
    );
}

export function Email(props: Omit<InputProps, "type">) {
    return (
        <Input {...props} type="email" icon="mail" placeholder="Email Address" />
    );
}
export function Password(props: Omit<InputProps, "type">) {
    return <Input {...props} type="password" />;
}