import { DynamicIcon } from 'lucide-react/dynamic';

interface IconProps {
    className?: string,
    icon: any,
    size?: number,
    width?: number
}
export default function Icon({ className, icon, size, width }: IconProps) {
    const classNames = "icon" + (className ? " " + className : "");
    const strokeWidth = width || 3;
    
    return (
        <DynamicIcon className={classNames} name={icon} absoluteStrokeWidth={true} size={size} strokeWidth={strokeWidth} />
    );
}