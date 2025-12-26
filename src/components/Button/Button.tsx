import "./Button.css";
import BaseProps from "../props"
import Icon from "../Icon/Icon";
import Link from "next/link";

interface ButtonProps extends BaseProps {
    label?: string,
    type?: "button" | "submit" | "reset",
    href?: string,
    active?: boolean,
    disabled?: boolean
    onClick?: () => void,
}

export default function Button({
    id,
    className,
    label,
    icon,
    type,
    href,
    active,
    disabled,
    onClick,
}: ButtonProps) {
    const classNames = "app-button" + (className ? " " + className : "") + (active ? " active" : "") + (disabled ? " disabled" : "");
    if (href) {
        return (
            <Link id={id} className={classNames} href={href}>
                {icon && <Icon icon={icon[0]} size={icon[1]} />}
                {label}
            </Link>
        );
    } else {
        return (
            <button id={id} className={classNames} onClick={onClick} type={type} disabled={disabled}>
                {icon && <Icon icon={icon[0]} size={icon[1]} />}
                {label}
            </button>
        );
    }
}