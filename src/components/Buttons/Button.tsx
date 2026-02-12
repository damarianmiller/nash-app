import "./Button.css";
import { ButtonProps } from "../Types";
import Icon from "@/Components/Icons/Icon";

export default function Button(props: ButtonProps) {
    if (typeof props.href === "string") {
        const { variant, size, icon, text, active, className, ...anchorProps } = props;
        const classNames =
        "app-button" +
        (className ? " " + className : "") +
        (variant ? " varient-" + variant : " varient-theme") +
        (size ? " size-" + size : "") + 
        (active ? " active" : "");
        
        return (
            <a {...anchorProps} className={classNames}>
                {icon && <Icon name={icon} size={size} />}
                {text && <label>{text}</label>}
            </a>
        );
    }
    
    const { variant, size, icon, text, active, className, ...buttonProps } = props;
    const classNames =
        "app-button" + 
        (className ? " " + className : "") +
        (variant ? " varient-" + variant : " varient-theme") + 
        (size ? " size-" + size : "") +  
        (active ? " active" : "");

    return (
        <button {...buttonProps} className={classNames}>
            {icon && <Icon name={icon} size={size} />}
            {text && <label>{text}</label>}
        </button>
    );
}