import Form, {useForm} from "@/Components/Forms/Form";
import * as Input from "@/Components/Inputs/Input";
import Button from "@/Components/Buttons/Button";

export default function CreateCourse( { userInstitutions }: { userInstitutions: {label: string; value: string}[] } ) {
    const { values, errors, handleChange, handleSubmit, reset } = useForm({
        initialValues: {
            title: "",
            code: "",
            description: "",
            credit_hours: "0",
            institution: "",
        },
        validate: (values) => {
            const errors: Partial<Record<keyof typeof values, string>> = {};
            if (values.title.trim() === "") {
                errors.title = "A title is required.";
            }
            if (values.code.trim() === "") {
                errors.code = "A course code is required.";
            }
            if (values.description.trim() === "") {
                errors.description = "A description is required.";
            }
            if (values.institution.trim() === "") {
                errors.institution = "An institution is required.";
            }
            const creditHours = parseInt(values.credit_hours, 10);
            if (isNaN(creditHours) || creditHours < 0 || creditHours > 6) {
                errors.credit_hours = "Credit hours must be a number between 0 and 6.";
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                await console.log("Form submitted with values:", values);
                reset();
            } catch (error) {
                console.error("Error submitting form:", error);
            }
            
        }
    });
    return (
        <Form process="single-step" onSubmit={handleSubmit}>
            <Input.Text size="l" name="title" label="Title" placeholder="Intro to Sociology" icon="case-sensitive" onChange={handleChange} value={values.title} error={errors.title}/>
            <Input.Text size="l" name="code" label="Code" placeholder="SOC 101" icon="hash" onChange={handleChange} value={values.code} error={errors.code}/>
            <Input.Text size="l" name="description" label="Description" placeholder="A survey of sociological concepts and theories." icon="file-text" onChange={handleChange} value={values.description} error={errors.description}/>
            <Input.Number size="l" name="credit_hours" label="Credit Hours" placeholder="3" icon="clock" min={0} max={6} step={1} onChange={handleChange} value={values.credit_hours} error={errors.credit_hours}/>
            <Input.Dropdown size="l" name="institution" label="Institution" icon="building" options={userInstitutions} onChange={handleChange} value={values.institution} error={errors.institution}/> 
            <Button size="m" type="submit" text="Create Course" icon="plus" variant="push" />
        </Form>
    );	
}