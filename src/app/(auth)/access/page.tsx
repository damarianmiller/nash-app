'use client';
import Container from "@/components/Container/Container";
import Form from "@/components/Form/Form";
import {Page} from "@/components/Form/Form";
import * as Input from "@/components/Form/Input";


import { login } from "../actions";
import { initialLoginState } from "./state";
import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

function AwaitAuthAndContinue() {
	const router = useRouter();
	const doneRef = useRef(false);

	useEffect(() => {
		let cancelled = false;
		let intervalId: number | null = null;

		const stop = () => {
			if (intervalId !== null) {
				clearInterval(intervalId);
				intervalId = null;
			}
		};

		const tick = async () => {
			if (cancelled || doneRef.current) return;

			// 1) Are we authenticated yet?
			const sessionRes = await fetch("/session", { cache: "no-store" });
			if (!sessionRes.ok) return;

			const { authenticated } = await sessionRes.json();
			if (!authenticated) return;

			// Lock + stop polling immediately
			doneRef.current = true;
			stop();

			// 2) Decide where to go next (registered vs onboarding)
			const postAuthRes = await fetch("/post-auth", { cache: "no-store" });
			if (!postAuthRes.ok) {
				doneRef.current = false; // optional: allow retry
				return;
			}
			const { next } = await postAuthRes.json();

			// optional delay for animation
			setTimeout(() => {
				if (!cancelled) router.replace(next || "/");
			}, 800);
		};

		tick();
		intervalId = window.setInterval(tick, 1200);

		return () => {
			cancelled = true;
			stop();
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