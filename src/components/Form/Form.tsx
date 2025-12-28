"use client";
import "./Form.css";
import BaseProps from "../props"

import Container from "../Container/Container";
import Button from "../Button/Button";
import { Children, useState, cloneElement } from "react";


interface FormProps extends BaseProps {
    submit: [[string, number], string];
    action?: any | undefined;
    method?: "POST" | "GET" | "PUT" | "DELETE" | "PATCH" | undefined;
    onSubmit?: any;
}

export default function Form({children, className, action, submit, method, onSubmit}: FormProps) {
    const classNames = "app-form" + (className ? " " + className : "");
    const pages = Children.toArray(children).filter(child => child.type != "input");

    if (pages.length > 1) { //Check if direct children of the form are not inputs but pages or some other container.
        const [currentPage, setCurrentPage] = useState(0);
        function BackButton() {
            if (currentPage > 0) {
                return (
                    <Button type="button" className="app-form-back-button" icon={["arrow-left", 20]} label="Back" onClick={() => setCurrentPage(currentPage - 1)} />
                )
            }
        }
        function NextButton() {
            if (currentPage < pages.length - 1) {
                return (
                    <Button type="button" className="app-form-next-button" icon={["arrow-right", 20]} label="Next" onClick={() => setCurrentPage(currentPage + 1)} />
                )
            } else if (currentPage === pages.length - 1) {
                return (
                    <Button type="submit" className="app-form-next-button" icon={submit[0]} label={submit[1]} />
                );
            }
        }
        return (
            <form className={classNames + " multi-page"} action={action} method={method} onSubmit={onSubmit}>  
                {pages.map((child, index) => {
                    return cloneElement(child, {key: index, id: index, className: "app-form-page", style: {display: index === currentPage ? "flex" : "none"}})
                })}
                <BackButton />
                <NextButton />
            </form>
        );
    } else { //Single page form
        return (
            <form className={classNames + " single-page"} action={action} method={method} onSubmit={onSubmit}>  
                {children}
                <Container className="app-form-button-container" flow="row" mainAxisAlign="center" crossAxisAlign="center">
                    <Button type="submit" icon={submit[0]} label={submit[1]} />
                </Container>
            </form>
        );
    }
}