import "./Chip.css";
import { ChipProps } from "@/Components/Types";

export default function Chip(props: ChipProps) {
    const { size, color, className, children, ...chipProps } = props;
    
    const classNames = 
    "app-chip" + 
    (className ? " " + className : "") + 
    (size ? " size-" + size : "") + 
    (color ? " color-" + color : "");
    
    return (
        <span {...chipProps} className={classNames}>
            {children}
        </span>
    );
}