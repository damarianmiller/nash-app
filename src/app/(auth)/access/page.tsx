'use client';
import Container from "@/components/Container/Container";
import Form from "@/components/Form/Form";
import {Page} from "@/components/Form/Form";
import * as Input from "@/components/Form/Input";
import { login } from "../actions";
import { useSearchParams } from "next/navigation";




export default function AccessPage() {
	const searchParams = useSearchParams();
	const newUser = searchParams.get("new-user");
	const linkSent = searchParams.get("link-sent") === "true";
	const emailParam = searchParams.get("email") || "";




	if (newUser === "true") {
		return (
			<Container flow="column" mainAxisAlign="center" crossAxisAlign="center" gap="xxl">
				<h2>Welcome to Nash.</h2>
				<p>It looks like this is your first time here. </p>
			</Container>
		);
	} else if (newUser && newUser === "false") {
		//redirect to home
		window.location.href = "/";
	} else if (linkSent) {
		return (
			<Container flow="column" mainAxisAlign="center" crossAxisAlign="center" gap="xxl">
				<h2>Welcome to Nash.</h2>
				<p>A sign-in link has been sent to your email{emailParam ? emailParam + "." : "."} Please check your inbox and click the link to continue.</p>
			</Container>
		);
	} else {
		return (
			<Container flow="column" mainAxisAlign="center" crossAxisAlign="center" gap="xxl">
				<Form submit={[["send", 20], "Continue"]} action={login}>
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
	}
}