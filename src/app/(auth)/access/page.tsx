'use client';
import Container from "@/components/Container/Container";
import Form from "@/components/Form/Form";
import {Page} from "@/components/Form/Form";
import * as Input from "@/components/Form/Input";


import { login } from "../actions";
import { initialLoginState } from "./state";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

function AwaitAuthAndContinue() {
	const router = useRouter();

	useEffect(() => {
		let stopped = false;

		const tick = async () => {
			const res = await fetch("/session", { cache: "no-store" });
			if (!res.ok) return;

			const { authenticated } = await res.json();
			if (authenticated && !stopped) {
				// optional: small delay for animation
				setTimeout(() => router.replace("/"), 800);
			}
		};
		// check quickly, then every ~1s
		tick();
		const id = setInterval(tick, 1200);
		return () => {
			stopped = true;
			clearInterval(id);
		};
	}, [router]);
	return null;
}


export default function AccessPage() {
	const [loginState, loginAction, pending] = useActionState(login, initialLoginState);

	if (loginState.status === "waiting" || !loginState.status) {
		return (
			<Container flow="column" mainAxisAlign="center" crossAxisAlign="center" gap="xxl">
				<Form submit={[["send", 20], pending ? "Sending ..." : "Continue"]} action={loginAction}>
					<Page>
						<h2>Welcome to Nash.</h2>
					</Page>
					<Page>
						<h6>Let's start with an email.</h6>
						<Input.Email required={true} />
					</Page>
				</Form>
			</Container>
		);
	} else if (loginState.status === "sent") {
		return (
			<Container flow="column" mainAxisAlign="center" crossAxisAlign="center" gap="m">
				<AwaitAuthAndContinue />
				<h2>Check your inbox</h2>
				<p>{loginState.message}</p>
			</Container>
		);
	} else if (loginState.status === "error") {
		return (
			<Container flow="column" mainAxisAlign="center" crossAxisAlign="center" gap="m">
				<h2>Something went wrong</h2>
				<p>{loginState.message}</p>
				<p className="error-message">{loginState.error}</p>
			</Container>
		);
	}
}