import Container from "@/components/Container/Container";
import Form from "@/components/Form/Form";
import * as Input from "@/components/Form/Input";

function login() {}

export default function LoginView() {
    return (
        <Container flow="column" gap="m" mainAxisAlign="center" crossAxisAlign="center">
            <h2>Login</h2>
            <Form SubmitButtonLabel="Continue" action={login}>
                <Input.Email />
            </Form>
        </Container>
    );
}