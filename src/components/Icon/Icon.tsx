import BaseProps from "../props";
import { DynamicIcon } from "lucide-react/dynamic";

interface IconProps extends BaseProps {
    icon: any,
    size: number,
    width?: number
}
export default function Icon({ id, className, icon, size, width }: IconProps) {
    const classNames = "app-icon" + (className ? " " + className : "");
    const strokeWidth = width || 3;
    return (
        <DynamicIcon id={id} className={classNames} name={icon} absoluteStrokeWidth={true} size={size} strokeWidth={strokeWidth} />
    );
}