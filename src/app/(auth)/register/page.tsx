import Form from "@/components/Form/Form";
import { Page } from "@/components/Form/Form";  
import Input from "@/components/Form/Input";
import Container from "@/components/Container/Container";

export default function RegisterPage() {
    return (
        <Container flow="column" mainAxisAlign="start" crossAxisAlign="stretch" gap="xxl">
            <h2>Welcome to Nash</h2>

        
            <Form type="multi-page" method="get" action="/register" SubmitButtonLabel="Register">
                <Page>
                    <h6>What's your first name?</h6>
                    <Input type="text" name="firstName" placeholder="John" required={true} />
                </Page>
                <Page>
                    <h6>What's your last name?</h6>
                    <Input type="text" name="lastName" placeholder="Doe" required={true} />
                </Page>
                <Page>
                    <h6>What is your phone number?</h6>
                    <Input type="tel" name="phone" placeholder="(123) 456-7890" required={true} />
                </Page>
                <Page>
                    <h6>What is your major?</h6>
                    <Input type="text" name="major" placeholder="Major" required={true} />
                </Page>
            </Form>
        </Container>
    );
}