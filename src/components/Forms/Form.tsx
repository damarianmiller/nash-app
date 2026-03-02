import "./Form.css";
import { FormProps } from "@/Components/Types";
import { Column } from "@/Components/Containers/Wrappers";
import { useState } from "react";

export function useForm<T extends Record<string, string>>({
    initialValues,
    validate,
    onSubmit
}: {
    initialValues: T;
    validate?: (values: T) => Partial<Record<keyof T, string>>;
    onSubmit: (values: T) => void | Promise<void>;
}) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    const reset = () => {
        setValues(initialValues);
        setErrors({});
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const newValues = { ...values, [name]: value };
        setValues(newValues as T);
        
        if (validate) {
            const validationErrors = validate(newValues as T);
            setErrors((previousErrors) => ({
                ...previousErrors,
                [name]: validationErrors[name as keyof T]
            }));
        }
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (validate) {
            const validationErrors = validate(values);
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length > 0) {
                return;
            }
        }
        onSubmit(values);
    }
    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        reset
    }
}

function SingleStepForm(props: Omit<FormProps, "process">) {
    const { children, ...formProps } = props;
    return(
        <Column {...formProps} as="form" wrap="nowrap" mainAxis="start" crossAxis="stretch" gap="xl">
            { children }
        </Column>
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