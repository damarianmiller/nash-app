"use client";
import Button from "@/Components/Buttons/Button";
import { Row, Column } from "@/Components/Containers/Wrappers";
import Form from "@/Components/Forms/Form";
import * as Input from "@/Components/Inputs/Input";
import { useActionState } from "react";

import { authenticateUser, type AuthenticationState } from "./actions";

const initalAuthenticationState: AuthenticationState = { status: "idle" };

function AuthenticationFlow() {
	const [authenticationState, authenticationAction, authenticationPending] = useActionState(authenticateUser, initalAuthenticationState);
	if (authenticationState.status === "idle") {
		return (
			<Column wrap="nowrap" mainAxis="center" crossAxis="center" gap="xxl">
				<h3>Let's begin with an email address.</h3>
				<Form process="single-step" action={authenticationAction}>
					<Input.Email size="m" name="email" required={true} />
					<Button size="m" icon="send" text={authenticationPending ? "Sending" : "Continue"} type="submit" />
				</Form>
			</Column>
		);
	} else if (authenticationState.status === "inProgress") {
		return (
			<Column wrap="nowrap" mainAxis="center" crossAxis="center" gap="xxl">
				<Column wrap="nowrap" mainAxis="center" crossAxis="center" gap="l">
					<h2>Productivity Is Awaiting...</h2>
					<h6>A link has been sent to your email.</h6>
					<h6>Click it to proceed.</h6>
				</Column>
				<Row wrap="nowrap" mainAxis="center" crossAxis="center" gap="l">
					<p>Didn't recieve an email?</p>
					<Button size="s" icon="send" text="Resend" />
				</Row>
			</Column>
		);
	} else if (authenticationState.status === "error") {
		return (
			<Column wrap="nowrap" mainAxis="center" crossAxis="center" gap="xxl">
				<Column wrap="nowrap" mainAxis="center" crossAxis="center" gap="xl">
					<h3>Something went wrong</h3>
					<h6>Refresh the page and try again.</h6>
				</Column>
				<Row wrap="nowrap" mainAxis="center" crossAxis="center" gap="l">
					<label style={{ fontSize: "var(--size-xs)", fontWeight: "var(--weight-light)", textAlign: "center" }}>Error: {authenticationState.error}</label>
				</Row>
			</Column>
		);
	}
	return null;
}

function RegistrationFlow({ student }: { student?: any }) {
	return (
		<>
			<Column wrap="nowrap" mainAxis="center" crossAxis="center" gap="xl" fillWidth fillHeight>
				<h2>Welcome Back, {student.first_name}</h2>
				<h6>Your email has been verified.</h6>
				<h6>Proceed to your dashboard.</h6>
				<Button size="m" icon="arrow-right" text="Go to Dashboard" variant="push" href="/"/>
			</Column>
		</>
	);
}

export default function AccessPage({ user, student }: { user: any | null, student: any | null }) {
	if (!user) {
		return (
			<AuthenticationFlow></AuthenticationFlow>
		);
	} else if (user) {
		return (
			<RegistrationFlow student={student}></RegistrationFlow>
		);
	}
	
}