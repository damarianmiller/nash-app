import "./TopBar.css";

interface TopBarProps {
    title: string;
}

export default function TopBar({ title }: TopBarProps) {
    return (
        <header className="app-topbar">
            <h1 className="app-topbar-title">{title}</h1>
        </header>
    );
}