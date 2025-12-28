"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";

import Container from "@/components/Container/Container";
import Form from "@/components/Form/Form";
import * as Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

import { authenticateUser } from "../actions";
import { registerUser } from "../actions";

import { initialAuthenticationState } from "./state";
import { initialRegistrationState } from "./state";


function Registration() {
	const [hasMinor, setHasMinor] = useState<string>("");
	return (
		<Form submit={[["send", 20], "Finish"]} action={registerUser}>
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
				<Input.Radio name="hasMinor" required={true} 
					onChange={(e) => setHasMinor(e.target.value)}
					radios={
						[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]
					} />
				</Container>
			</Container>
			{hasMinor === "yes" && (
				<Container flow="column" mainAxisAlign="center" crossAxisAlign="start" gap="m">
					<h6>What is your minor?</h6>
					<Input.Text
						name="minor"
						icon={["book", 20]}
						label="Minor"
						placeholder="Economics"
						required={true}
					/>
				</Container>
			)}
			<Container flow="column" mainAxisAlign="center" crossAxisAlign="start" gap="m">
				<h6>Where do you go to school?</h6>
				<Input.Text
					name="primaryInstitution"
					icon={["university", 20]}
					label="Primary Institution"
					placeholder="University of Illinois Urbana-Champaign"
					required={true}
				/>
			</Container>
		</Form>
	);
}

function Authentication() {
	const [authenticationState, authenticationAction, authenticationPending] = useActionState(authenticateUser, initialAuthenticationState);

	if (authenticationState.status === "awaitingInput") {
		return (
			<Container flow="column" mainAxisAlign="center" crossAxisAlign="center" gap="xl">
				<h2>Welcome to Nash.</h2>
				<Form submit={[["send", 20], authenticationPending ? "Sending link" : "Continue"]} action={authenticationAction}>
					<Container flow="column" mainAxisAlign="center" crossAxisAlign="start" gap="m">
						<h6>Let's start with an email.</h6>
						<Input.Email label="Email Address" required={true} />
					</Container>
				</Form>
			</Container>
		);
	}
	if (authenticationState.status === "inProgress") {
		return (
			<Container flow="column" mainAxisAlign="center" crossAxisAlign="center" gap="xl">
				<h2>Check your email</h2>
				<h6>A link has been sent to your email. Click the link to continue...</h6>
			</Container>
		);
	}
	if (authenticationState.status === "authenticated") {
		
	}

	if (authenticationState.status === "error") {
		return (
			<>
				<h2>Something went wrong</h2>
				<p className="error-message">{authenticationState.error}</p>
			</>
		);
	}
}


export default function AccessPage() {
	const [accessPhase, setAccessPhase] = useState("loading");
	const router = useRouter();

	async function fetchAccessStatus() {
		const response = await fetch("../access-status");
		const data = await response.json();
		if (!data.authenticated) {
			setAccessPhase("authentication");
		} else if (data.authenticated && !data.registered) {
			setAccessPhase("registration");
		} else if (data.authenticated && data.registered) {
			router.replace("/");
		}
	}
	fetchAccessStatus();

	if (accessPhase === "loading") {
		return <p>Loading...</p>;
	}
	else if (accessPhase === "authentication") {
		return <Authentication />;
	}
	else if (accessPhase === "registration") {
		return <Registration />;
	}
	
}