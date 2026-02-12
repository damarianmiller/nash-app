"use client";
import { AccordionProps } from "@/Components/Types";
import { Row, Column } from "@/Components/Containers/Wrappers";
import Button from "@/Components/Buttons/Button";
import { useState } from "react";

export default function Accordion(props: AccordionProps) {
    const { header, content, isOpenByDefault, className, children, ...accordionProps } = props;
    const classNames =
        "app-accordion" +
        (className ? " " + className : "");

    const [isOpen, setIsOpen] = useState(isOpenByDefault ?? false);
    return (
        <Column wrap="nowrap" mainAxis="center" crossAxis="center" gap="s" {...accordionProps} className={classNames}>
            <Row as="header" wrap="nowrap" mainAxis="start" crossAxis="center" gap="s">
                <Button size="m" onClick={() => setIsOpen(!isOpen)}></Button>
                {header}
            </Row>
            {isOpen && content}
        </Column>
    );
}