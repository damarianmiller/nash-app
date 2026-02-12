import "./Form.css";
import { FormProps } from "@/Components/Types";

function SingleStepForm(props: FormProps) {
    const { process, className, children, ...formProps } = props;
    return(
        <form {...formProps} className={className}>
            { children }
        </form>
    );
}

export default function Form(props: FormProps) {
    const { process, size, className, children, ...formProps } = props;
    const classNames = "app-form" +
    (size ? " size-" + size : "") +
    (className ? " " + className : "");

    if (process === "single-step") {
        return (
            <SingleStepForm {...formProps} className={classNames} process="single-step">{ children }</SingleStepForm>
        );
    }
    return null;
}