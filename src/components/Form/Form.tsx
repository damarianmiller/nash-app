"use client";
import "./Form.css";
import BaseProps from "../props"

import Container from "../Container/Container";
import Button from "../Button/Button";
import { Children, useState, isValidElement, ReactElement, cloneElement } from "react";



interface FormProps extends BaseProps {
    submit: [[string, number], string];
    method?: "GET" | "POST";
    action: any;
}

export default function Form({children, className, method, action, submit}: FormProps) {
    const classNames = "app-form" + (className ? " " + className : "");
    if (Children.toArray(children).filter(child => child.type != "input").length > 1) { //Check if direct children of the form are not inputs but pages or some other container.
        const [currentPage, setCurrentPage] = useState(0);
        function BackButton() {
            if (currentPage > 0) {
                return (
                    <Button type="button" className="app-form-back-button" icon={["arrow-left", 20]} label="Back" onClick={() => setCurrentPage(currentPage - 1)} />
                )
            }
        }
        function NextButton() {
            if (currentPage < Children.count(children) - 1) {
                return (
                    <Button type="button" className="app-form-next-button" icon={["arrow-right", 20]} label="Next" onClick={() => setCurrentPage(currentPage + 1)} />
                )
            } else if (currentPage === Children.count(children) - 1) {
                return (
                    <Button type="submit" className="app-form-next-button" icon={submit[0]} label={submit[1]} />
                );
            }
        }
        return (
            <form className={classNames + " multi-page"} action={action} method={method}>  
                {Children.toArray(children).map((child, index) => {
                    return cloneElement(child, {style: {display: index === currentPage ? "flex" : "none"}})
                })}
                <BackButton />
                <NextButton />
            </form>
        );
    } else { //Single page form
        return (
            <form className={classNames + " single-page"} action={action} method={method}>  
                {children}
                <Container className="app-form-button-container" flow="row" mainAxisAlign="center" crossAxisAlign="center">
                    <Button type="submit" icon={submit[0]} label={submit[1]} />
                </Container>
            </form>
        );
    }
}

interface PageProps extends BaseProps {
}

export function Page({ children, className, style }: PageProps) {
    const classNames = "app-form-page" + (className ? " " + className : "");
    return (
        <Container className={classNames} flow="column" mainAxisAlign="start" crossAxisAlign="stretch" gap="s" style={style}>
            {children}
        </Container>
    );
}