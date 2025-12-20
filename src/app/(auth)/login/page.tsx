import Container from "@/components/Container/Container";
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import { login } from "../actions";

export default function LoginView() {
    return (
        <Container flow="column" gap="m" mainAxisAlign="center" crossAxisAlign="center">
            <h2>Login</h2>
            <Form SubmitButtonLabel="Continue" action={login}>
                <Input type="email" name="email" placeholder="email@example.com" required={true} />
            </Form>
        </Container>
    );
}