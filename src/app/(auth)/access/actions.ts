"use server";

import createClient from "@/lib/supabase/server";
import { getUser } from "@/lib/auth/getUser";

export type AuthenticationState = {
	status: "idle" | "inProgress" | "success" | "error";
	error?: string;
	email?: string;
};

export async function authenticateUser(
	prevState: AuthenticationState,
	formData: FormData,
): Promise<AuthenticationState> {
	const email = String(formData.get("email") ?? "")
		.trim()
		.toLowerCase();

	if (!email) {
		return {
			status: "error",
			error: "Email is required.",
		};
	}

	if (await getUser()) {
		return {
			status: "success",
			email,
		};
	}

	const supabase = await createClient();
	const { error } = await supabase.auth.signInWithOtp({
		email,
		options: {
			emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL + "/access/callback",
		},
	});

	if (error) return { status: "error", error: error.message };
	return { status: "inProgress", email };
}
