import "./View.css";
import BaseProps from "../props"

interface ViewProps extends BaseProps {}

export default function View({ id, children }: ViewProps) {
    return (
        <main id={id} className="app-view">
            {children}
        </main>
    );
}