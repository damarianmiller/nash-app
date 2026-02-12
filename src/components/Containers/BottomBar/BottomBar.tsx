"use client";
import "./BottomBar.css";
import { BottomBarProps } from "@/Components/Types";
import Button from "@/Components/Buttons/Button";
import { usePathname } from "next/navigation";

export default function BottomBar(props: BottomBarProps) {
    const { pages, className, ...bottomBarProps } = props;
    const classNames = "app-bottombar" + (className ? " " + className : "");

    return (
        <nav {...bottomBarProps} className={classNames}>
            {pages.map((page, index) => (
                <Button key={index} size="m" icon={page.icon} href={page.href} active={(usePathname() === page.href)} />
            ))}
        </nav>
    );
}