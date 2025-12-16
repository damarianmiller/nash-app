import "./Button.css";
import BaseProps from "../props"
import Icon from "../Icon/Icon";

interface ButtonProps extends BaseProps {
    label?: string,
    type?: "button" | "submit" | "reset",
    href?: string,
    icon?: [string, number],
    active?: boolean,
    disabled?: boolean
    onClick?: () => void,
}

export default function Button({
    label,
    className,
    size,
    type,
    href,
    icon,
    active,
    disabled,
    onClick,
}: ButtonProps) {
    const classNames = "app-button" + (className ? " " + className : "") + (size ? " size-" + size : "") + (active ? " active" : "") + (disabled ? " disabled" : "");

    const anchorTag = (
        <a className={classNames} href={href}>
            {icon && <Icon icon={icon[0]} size={icon[1]} width={3} />}
            {label}
        </a>
    );

    const buttonTag = (
        <button className={classNames} onClick={onClick} type={type} disabled={disabled}>
            {icon && <Icon icon={icon[0]} size={icon[1]} width={3} />}
            {label}
        </button>
    );

    if (href) {
        return anchorTag;
    } else {
        return buttonTag;
    }
}