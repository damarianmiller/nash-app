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

export default function BottomBar({ id }: BottomBarProps) {
    return (
        <nav id={id} className="app-bottombar">
            {pages.map((page, index) => (
                <Button key={index} icon={[page.icon, 28]} href={page.href} active={usePathname() === page.href} />
            ))}
        </nav>
    )
}

