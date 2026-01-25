"use client";
import "./Accordion.css";
import { AccordionProps } from "@/Components/Props";
import Button from "@/Components/Buttons/Button";
import Text from "@/Components/Text/Text";
import { useState } from "react";



export default function Accordion(props: AccordionProps) {
    const { header, content, children, defaultOpen, ...accordionProps } = props;
    const classNames = "app-accordion";
    const [open, setOpen] = useState(defaultOpen ?? false);

    return (
        <div className={classNames}>
            <div className="app-accordion-header" onClick={() => setOpen(!open)}>
                <Button size="m" icon={open ? "panel-top-close" : "panel-top-open"} varient="inline" onClick={() => setOpen(!open)} />
                {header}
            </div>
            <div className="app-accordion-content">
                {open && content}
            </div>
        </div>
    );
}