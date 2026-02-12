import "./Card.css";
import { CardProps } from "@/Components/Types";
export default function Card(props: CardProps) {
    const { size, color, className, children, ...cardProps } = props;
    let classNames = 
    "app-card" + 
    (size ? " size-" + size : "") +
    (color ? " color-" + color : "") +
    (className ? " " + className : "");

    return (
        <article {...cardProps} className={classNames}>
            { children }
        </article>
    );
}