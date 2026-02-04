import { IconProps, SizeHelper } from "@/Components/Props";
import { DynamicIcon } from "lucide-react/dynamic";

export default function Icon(props: IconProps) {
    const { name, size, color, width, className, style, ...iconProps } = props;
    let classNames = "app-icon" + (className ? " " + className : "");
    let styles = {
        ...style,
        width: SizeHelper[size],
        height: SizeHelper[size]
    };
    const strokeWidth = width || 3;

    return (
        <DynamicIcon {...iconProps} className={classNames} style={styles} name={name} color={color} strokeWidth={strokeWidth} absoluteStrokeWidth={true} />
    );
}