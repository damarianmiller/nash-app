import "./Button.css";
import BaseProps from "../props"
import Icon from "../Icon/Icon";
import Link from "next/link";

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

    const linkTag = (
        <Link className={classNames} href={href}>
            {icon && <Icon icon={icon[0]} size={icon[1]} width={3} />}
            {label}
        </Link>
    );

    const buttonTag = (
        <button className={classNames} onClick={onClick} type={type} disabled={disabled}>
            {icon && <Icon icon={icon[0]} size={icon[1]} width={3} />}
            {label}
        </button>
    );

    if (href) {
        return linkTag;
    } else {
        return buttonTag;
    }
}