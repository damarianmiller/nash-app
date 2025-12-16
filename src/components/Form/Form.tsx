import "./Form.css";
import BaseProps from "../props"

import Container from "../Container/Container";
import Button from "../Button/Button";

interface FormProps extends BaseProps {
    SubmitButtonLabel: string;
    action: any;
}

export default function Form({children, className, SubmitButtonLabel, action}: FormProps) {
    const classNames = "app-form" + (className ? " " + className : "");
    return (
        <form className={classNames} action={action}>
            {children}
            <Container flow="row" mainAxisAlign="center" crossAxisAlign="center" gap="s">
                <Button label={SubmitButtonLabel} icon={["send", 20]}/>
            </Container>
        </form>
    );
}