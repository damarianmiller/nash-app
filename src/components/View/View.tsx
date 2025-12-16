import "./View.css";
import BaseProps from "../props"

interface ViewProps extends BaseProps {}

export default function View({ children, className }: ViewProps) {
    const classNames = "app-view" + (className ? " " + className : "");
    return (
        <main className={classNames}>
            {children}
        </main>
    );
}