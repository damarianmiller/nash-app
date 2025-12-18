"use client";
import "./Form.css";
import BaseProps from "../props"

import Container from "../Container/Container";
import Button from "../Button/Button";
import { Children, useState, isValidElement, ReactElement } from "react";

interface FormProps extends BaseProps {
    SubmitButtonLabel: string;

    type?: "multi-page" | "single-page";
    method?: "get" | "post";
    action: any;
}

export default function Form({children, className, type, method, action, SubmitButtonLabel}: FormProps) {
    const classNames = "app-form" + (className ? " " + className : "");

    if (type === "multi-page") {
        const [currentPage, setCurrentPage] = useState(0);
        const pages = Children.toArray(children);
        
        function nextPage() {
            if (currentPage < pages.length - 1) {
                setCurrentPage(currentPage + 1);
            }
        }
        function previousPage() {
            if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
            }
        }
        


        function BackButton() {
            if (currentPage > 0) {
                return <Button type="button" className="app-form-back-button" icon={["arrow-left", 20]} label="Back" onClick={previousPage} disabled={currentPage === 0} />;
            } else {
                return null;
            }
        }
        
        function NextButton() {
            if (currentPage < pages.length - 1) {
                const currentInputs = Children.toArray(pages[currentPage]?.props?.children.filter((child): child is ReactElement => {
                    return isValidElement(child) && child.type === "input";
                }));
                let containsRequiredInput = false
                for (let i = 0; i < currentInputs.length; i++) {
                    const input = currentInputs[i];
                    if (input.props.required === true) {
                        containsRequiredInput = true;
                        break;
                    }
                }
                if (containsRequiredInput === false) {
                    return <Button type="button" className="app-form-next-button" icon={["arrow-right", 20]} label="Skip" onClick={nextPage} />;
                } else {
                    return <Button type="button" className="app-form-next-button" icon={["arrow-right", 20]} label="Next" onClick={nextPage} />;
                }
            } else {
                return <Button type="submit" className="app-form-next-button" label={SubmitButtonLabel} icon={["check", 20]} />;
            }
        }

        return (
            <form className={classNames} action={action} method={method}>
                {pages[currentPage]}
                <BackButton />
                <NextButton />
            </form>
        );
    } else {
        return (
            <form className={classNames} action={action} method={method}>  
                {children}
                <Container className="app-form-submit-container" flow="row" mainAxisAlign="center" crossAxisAlign="center">
                    <Button type="submit">{SubmitButtonLabel}</Button>
                </Container>
            </form>
        );
    }    
}

interface PageProps extends BaseProps {

}

export function Page({ children, className }: PageProps) {
    const classNames = "app-form-page" + (className ? " " + className : "");
    return (
        <Container className={classNames} flow="column" mainAxisAlign="start" crossAxisAlign="stretch" gap="s">
            {children}
        </Container>
    );
}