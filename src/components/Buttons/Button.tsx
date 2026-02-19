import "./Button.css";
import { ButtonProps } from "@/Components/Types";
import { Row } from "@/Components/Containers/Wrappers";
import Icon from "@/Components/Icons/Icon";

export default function Button(props: ButtonProps) {
    if (typeof props.href === "string") {
        const { variant, size, icon, text, active, className, ...anchorProps } = props;
        const classNames =
            "app-button" +
            (className ? " " + className : "") +
            (variant ? " variant-" + variant : "") +
            (size ? " size-" + size : "") + 
            (active ? " active" : "");
        
        return (
            <Row {...anchorProps} className={classNames} as="a" wrap="nowrap" mainAxis="center" crossAxis="center" gap="s">
                {icon && <Icon name={icon} size={size} />}
                {text && <label>{text}</label>}
            </Row>
        );
    }
    
    const { variant, size, icon, text, active, className, ...buttonProps } = props;
    const classNames =
        "app-button" + 
        (className ? " " + className : "") +
        (variant ? " variant-" + variant : "") + 
        (size ? " size-" + size : "") +  
        (active ? " active" : "");

    return (
        <Row {...buttonProps} className={classNames} as="button" wrap="nowrap" mainAxis="center" crossAxis="center" gap="s">
            {icon && <Icon name={icon} size={size} />}
            {text && <label>{text}</label>}
        </Row>
    );
}