import "./Form.css";
import { FormProps } from "@/Components/Props";


function SingleStepForm(props: FormProps) {
    const { className, children, ...formProps } = props;
    return(
        <form {...formProps} className={className}>
            { children }
        </form>
    );
}

export default function Form(props: FormProps) {
    const { process, className, children, ...formProps } = props;
    const classNames = "app-form" + (className ? " " + className : "");
    if (process === "single-step") {
        return (
            <>
                <SingleStepForm {...formProps} className={classNames}>{ children }</SingleStepForm>
            </>
        );
    }
    return null;
}