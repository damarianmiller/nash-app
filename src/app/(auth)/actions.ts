"use server";
import { createClient } from "@/lib/supabase/server";
import { AuthenticationState } from "./access/state";

export async function authenticate(prevState: AuthenticationState, formData: FormData): Promise<AuthenticationState> {
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
			error: error.message,
		};
	} else {
		return {
			status: "sent",
			error: undefined,
		};
	}
}