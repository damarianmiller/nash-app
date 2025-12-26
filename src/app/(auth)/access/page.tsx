"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";

import Container from "@/components/Container/Container";
import Form from "@/components/Form/Form";
import * as Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

import { authenticate } from "../actions";
import { initialAuthenticationState } from "./state";
import { access } from "fs";

type AccessState =
	| { status: "idle" }
	| { status: "checking" }
	| { status: "not_authenticated" }
	| { status: "authenticated&not_registered" }
	| { status: "registered" }
	| { status: "complete" }
	| { status: "error"; message: string };




function Registration() {
	return (
			<Form submit={[["send", 20], "Finish"]}>
				<Container flow="column" mainAxisAlign="center" crossAxisAlign="start" gap="m">
					<h6>What's your first name?</h6>
					<Input.Text name="firstName" icon={["user", 20]} label="First Name" placeholder="John" required={true} />
				</Container>
				<Container flow="column" mainAxisAlign="center" crossAxisAlign="start" gap="m">
					<h6>What's your last name?</h6>
					<Input.Text name="lastName" icon={["user", 20]} label="Last Name" placeholder="Doe" required={true} />
				</Container>
				<Container flow="column" mainAxisAlign="center" crossAxisAlign="start" gap="m">
					<h6>What's your major?</h6>
					<Input.Text name="major" icon={["graduation-cap", 20]} label="Major" placeholder="Political Science" required={true} />
				</Container>
				<Container flow="column" mainAxisAlign="center" crossAxisAlign="start" gap="m">
					<h6>Do you have a minor?</h6>
					<Container flow="row" mainAxisAlign="center" crossAxisAlign="center" gap="xs" >
						<Input.Radio name="hasMinor" required={true} radios={
							[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]
						} />
					</Container>
				</Container>
			</Form>
	);
}

export default function AccessPage() {
	const [authenticationState, authenticationAction, pending] = useActionState(authenticate, initialAuthenticationState);
	const [accessState, setAccessState] = useState<AccessState>({ status: "idle" });
	let content = null;

	async function checkAccess() {
		setAccessState({ status: "checking" });
		const accessCheck = await fetch("../access-status", { cache: "no-store" });
		if (!accessCheck.ok) {
			setAccessState({ status: "error", message: "Could not check access status." });
			return;
		}

		const json: { authenticated: boolean; registered: boolean; error?: string } = await accessCheck.json();
		const authenticated = json.authenticated;
		const registered = json.registered;

		if (!authenticated) {
			setAccessState({ status: "not_authenticated" });
			return;
		} else if (authenticated) {
			if (!registered) {
				setAccessState({ status: "authenticated&not_registered" });
			} else if (registered) {
				setAccessState({ status: "complete" });
			}
		}
	}

	
	if (authenticationState.status === "awaitingInput") {
		content = (
			<>
				<h2>Welcome to Nash.</h2>
				<Form submit={[["send", 20], pending ? "Sending link" : "Continue"]} action={authenticationAction}>
					<Container flow="column" mainAxisAlign="center" crossAxisAlign="start" gap="m">
						<h6>Let's start with an email.</h6>
						<Input.Email label="Email Address" required={true} />
					</Container>
				</Form>
			</>
		);
	}
	if (authenticationState.status === "sent") {
		if (accessState.status === "idle" || accessState.status === "checking") {
			content = (
				<>
					<h2>Check your inbox</h2>
					<p>An access link has been sent to your email.</p>
					<Button icon={["refresh-cw", 20]} label={accessState.status === "checking" ? "Confirming" : "Click after link"} onClick={checkAccess} />
				</>
			);
		}
		if (accessState.status === "not_authenticated") {
			content = (
				<>
					<h2>Check your inbox</h2>
					<p>No luck. Sometimes emails you need are actually in your spam.</p>
					<Button icon={["refresh-cw", 20]} label={"Click after link"} onClick={checkAccess} />
				</>
			);
		}
		if (accessState.status === "authenticated&not_registered") {
			content = (
				<>
					<Registration />
				</>
			);
		}
	}
	if (authenticationState.status === "error") {
		content = (
			<>
				<h2>Something went wrong</h2>
				<p className="error-message">{authenticationState.error}</p>
			</>
		);
	}
	return (
		<Container flow="column" mainAxisAlign="center" crossAxisAlign="center" gap="m">
			<Registration />
		</Container>
	);
}