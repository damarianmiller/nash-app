import "./Form.css";
import { FormProps } from "@/Components/Types";

function SingleStepForm(props: Omit<FormProps, "process">) {
    const { onSubmit, children, ...formProps } = props;


    function formSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
    }

    return(
        <form {...formProps} onSubmit={formSubmit}>
            { children }
        </form>
    );
}

export default function Form(props: FormProps) {
    const { process, className, children, ...formProps } = props;
    const classNames = "app-form" +
    (className ? " " + className : "");

    if (process === "single-step") {
        return (
            <SingleStepForm {...formProps} className={classNames}>
                { children }
            </SingleStepForm>
        );
    }
    return null;
}