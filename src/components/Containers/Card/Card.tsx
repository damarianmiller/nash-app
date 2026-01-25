import "./Card.css";
import { CardProps } from "@/Components/Props";
export default function Card(props: CardProps) {
    const { flow, wrap, xAlign, yAlign, gap, fill, size, color, className, children, ...cardProps } = props;
    let classNames = 
    "app-card" + 
    (className ? " " + className : "") + 
    (flow ? " flow-" + flow : "") + 
    (wrap ? " wrap-" + wrap : "") +
    (gap ? " gap-" + gap : "") + 
    (fill ? " fill-width" : "") +
    (size ? " size-" + size : "") +
    (color ? " color-" + color : "");

    if (flow === "row") {
        classNames = classNames + (xAlign ? " main-axis-align-" + xAlign: "") + (yAlign ? " cross-axis-align-" + yAlign : "");
    } else if (flow === "column") {
        classNames = classNames + (yAlign ? " main-axis-align-" + yAlign : "") + (xAlign ? " cross-axis-align-" + xAlign : "");
    }

    return (
        <article {...cardProps} className={classNames}>
            { children }
        </article>
    );
}