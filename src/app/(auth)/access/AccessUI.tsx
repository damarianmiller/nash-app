"use client";
import Button from "@/Components/Buttons/Button";
import Text from "@/Components/Text/Text";
import Wrapper from "@/Components/Containers/Wrapper";
import Form from "@/Components/Forms/Form";
import * as Input from "@/Components/Inputs/Input";
import { useActionState } from "react";

import { authenticateUser, type AuthenticationState } from "./actions";

const initalAuthenticationState: AuthenticationState = { status: "idle" };

function AuthenticationFlow() {
	const [authenticationState, authenticationAction, authenticationPending] = useActionState(authenticateUser, initalAuthenticationState);
	if (authenticationState.status === "idle") {
		return (
			<Wrapper flow="column" wrap="nowrap" xAlign="center" yAlign="center" gap="xxl">
				<Text tag="h3" align="center">Let's begin with an email address.</Text>
				<Form process="single-step" action={authenticationAction}>
					<Input.Email size="m" name="email" required={true} />
					<Button size="m" icon="send" text={authenticationPending ? "Sending" : "Continue"} type="submit" />
				</Form>
			</Wrapper>
		);
	} else if (authenticationState.status === "inProgress") {
		return (
			<Wrapper flow="column" wrap="nowrap" xAlign="center" yAlign="center" gap="xxl">
				<Wrapper flow="column" wrap="nowrap" xAlign="center" yAlign="center" gap="l">
					<Text tag="h2" align="center">Productivity Is Awaiting...</Text>
					<Text tag="h6" align="center">A link has been sent to your email.</Text>
					<Text tag="h6" align="center">Click it to proceed.</Text>
				</Wrapper>
				<Wrapper flow="row" wrap="nowrap" xAlign="center" yAlign="center" gap="l">
					<Text tag="p" align="center">Didn't recieve an email?</Text>
					<Button size="s" icon="send" text="Resend" />
				</Wrapper>
			</Wrapper>
		);
	} else if (authenticationState.status === "error") {
		return (
			<Wrapper flow="column" wrap="nowrap" xAlign="center" yAlign="center" gap="xxl">
				<Wrapper flow="column" wrap="nowrap" xAlign="center" yAlign="center" gap="xl">
					<Text tag="h3" align="center">Something went wrong</Text>
					<Text tag="h6" align="center">Refresh the page and try again.</Text>
				</Wrapper>
				<Wrapper flow="row" wrap="nowrap" xAlign="center" yAlign="center" gap="l">
					<Text tag="label" size="xs" weight="light" align="center">Error: {authenticationState.error}</Text>
				</Wrapper>
			</Wrapper>
		);
	}
	return null;
}

function RegistrationFlow() {
	return (
		<>
			hi
		</>
	);
}

export default function AccessPage({ user }: { user: any | null }) {
	if (!user) {
		return (
			<AuthenticationFlow></AuthenticationFlow>
		);
	} else if (user) {
		return (
			<RegistrationFlow></RegistrationFlow>
		);
	}
	
}