'use client';
import BaseProps from "../props"
import "./BottomBar.css";
import Button from "../Button/Button";
import { usePathname } from "next/navigation";

interface BottomBarProps extends BaseProps {}

const pages = [
    { icon: "layout-dashboard", label: "Dashboard", href: "/" },
    { icon: "notebook-pen", label: "Assignments", href: "/assignments" },
    { icon: "apple", label: "Courses", href: "/courses" },
]

export default function BottomBar() {
    return (
        <nav className="app-bottombar">
            {pages.map(page => (
                <Button key={page.label} icon={[page.icon, 28]} href={page.href} size="m" active={usePathname() === page.href} />
            ))}
        </nav>
    )
}

