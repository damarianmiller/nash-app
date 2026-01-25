import "./View.css";
import { ViewProps } from "@/Components/Props"

export default function View(props: ViewProps) {
    const { className, children, ...viewProps } = props;
    const classNames = "app-view" + (className ? " " + className : "");

    return (
        <main {...viewProps} className={classNames}>
            { children }
        </main>
    );
}