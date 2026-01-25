import "./Button.css";
import { ButtonProps } from "../Props";
import Icon from "@/Components/Icons/Icon";

export default function Button(props: ButtonProps) {
    if (typeof props.href === "string") {
        const { varient, size, icon, text, active, className, ...anchorProps } = props;
        const classNames =
        "app-button" +
        (className ? " " + className : "") +
        (varient ? " varient-" + varient : " varient-theme") +
        (size ? " size-" + size : "") + 
        (active ? " active" : "");
        
        return (
            <a {...anchorProps} className={classNames}>
                {icon && <Icon name={icon} size={size} />}
                {text && <label>{text}</label>}
            </a>
        );
    
    }
    const { varient, size, icon, text, active, className, ...buttonProps } = props;
    const classNames =
    "app-button" + 
    (className ? " " + className : "") +
    (varient ? " varient-" + varient : " varient-theme") + 
    (size ? " size-" + size : "") +  
    (active ? " active" : "");

    return (
        <button {...buttonProps} className={classNames}>
            {icon && <Icon name={icon} size={size} />}
            {text && <label>{text}</label>}
        </button>
    );
}