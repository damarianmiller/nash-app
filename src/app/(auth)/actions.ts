"use server";
import { createClient } from "@/lib/supabase/server";
import { LoginState } from "./access/state";

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
	const supabase = await createClient();
	const email = formData.get("email") as string;
	const emailRedirectLink = process.env.NEXT_PUBLIC_SITE_URL + "/callback?next=/";

	const { error, data } = await supabase.auth.signInWithOtp({
		email,
		options: {
			emailRedirectTo: emailRedirectLink,
		},
	});

	if (error) {
		return {
			status: "error",
			message: "There was an error sending the sign-in link.",
			error: error.message,
		};
	} else {
		return {
			status: "sent",
			message: "A sign-in link has been sent to " + email + ". Check your inbox to continue.",
		};
	}
}