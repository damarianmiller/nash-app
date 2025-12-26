import BaseProps from "../props";
import "./TopBar.css";

interface TopBarProps extends BaseProps {
    title: string;
}

export default function TopBar({ id, title }: TopBarProps) {
    return (
        <header id={id} className="app-topbar">
            <h1 className="app-topbar-title">{title}</h1>
        </header>
    );
}