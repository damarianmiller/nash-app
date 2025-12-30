"use client";

import { useActionState, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query"; //

import Container from "@/components/Container/Container";
import Form from "@/components/Form/Form";
import * as Input from "@/components/Input/Input";

import { authenticateUser } from "../actions";
import { registerUser } from "../actions";

import { initialAuthenticationState } from "./state";
import { initialRegistrationState } from "./state";
import { isReactCompilerRequired } from "next/dist/build/swc/generated-native";

const getAccessStatus = async () => {
	const res = await fetch("/access-status");
	if (!res.ok) throw new Error("Failed to fetch status");
	return res.json();
};

function Registration() {
	const [registrationState, registrationAction, registrationPending] = useActionState(registerUser, initialRegistrationState);
	const [hasMinor, setHasMinor] = useState<string>("");
	if (registrationState.status === "awaitingInput") {
		return (
			<Form submit={[["send", 20], "Finish"]} action={registrationAction}>
				<Container flow="column" mainAxisAlign="center" crossAxisAlign="start" gap="m">
					<h6>What's your first name?</h6>
					<Input.Text name="firstName" icon={["user", 20]} label="First Name" placeholder="John" required={true} />
				</Container>
				<Container flow="column" mainAxisAlign="center" crossAxisAlign="start" gap="m">
					<h6>What's your last name?</h6>
					<Input.Text name="lastName" icon={["user", 20]} label="Last Name" placeholder="Doe" required={true} />
				</Container>
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
			</Form>
		);
	}
	if (registrationState.status === "error") {
		return (
			<>
				<h2>Something went wrong</h2>
				<p className="error-message">{registrationState.error}</p>
			</>
		);
	}
}

function Authentication() {
	const [authenticationState, authenticationAction, authenticationPending] = useActionState(authenticateUser, initialAuthenticationState);

	if (authenticationState.status === "awaitingInput") {
		return (
			<Container flow="column" mainAxisAlign="center" crossAxisAlign="center" gap="xl">
				<h2>Welcome to Nash.</h2>
				<Form submit={[["send", 20], authenticationPending ? "Sending" : "Continue"]} action={authenticationAction}>
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
			<Container flow="column" mainAxisAlign="center" crossAxisAlign="center" gap="m">
				<h2>Check your email</h2>
				<h6>A link has been sent to your email. Click the link to continue...</h6>
			</Container>
		);
	}
	if (authenticationState.status === "error") {
		return (
			<>
				<h2>Something went wrong</h2>
				<p className="error-message">{authenticationState.error}</p>
			</>
		);
	}
	return null;
}

export default function AccessPage() {
	const router = useRouter();

	const { data, isLoading } = useQuery({
		queryKey: ['access-status'],
		queryFn: getAccessStatus,
		// Poll every 2 seconds (2000ms) UNTIL authenticated is true.
		refetchInterval: (query) => {
			const isAuth = query.state.data?.authenticated;
			const isReg = query.state.data?.registered;
			if (isAuth && isReg) {
				return false;
			} else {
				return 2000;
			}
		},
		refetchIntervalInBackground: true,
	});

	useEffect(() => {
		if (data?.authenticated && data?.registered) {
			router.replace("/");
		}
	}, [data, router]);

	if (isLoading) {
		return (
			<Container flow="column" mainAxisAlign="center" crossAxisAlign="center">
				<h6>Loading...</h6>
			</Container>
		);
	}
	if (data?.authenticated && !data?.registered) {
		return <Registration />;
	} else if (data?.authenticated && data?.registered) {
		return <h6>Redirecting...</h6>;
	}
	return <Authentication />;
}