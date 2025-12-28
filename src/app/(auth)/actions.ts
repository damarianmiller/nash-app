"use server";
import { createClient } from "@/lib/supabase/server";
import { AuthenticationState, RegistrationState } from "./access/state";

export async function authenticateUser(prevState: AuthenticationState, formData: FormData): Promise<AuthenticationState> {
	const supabase = await createClient();
	const { data: userData, error: userError } = await supabase.auth.getUser();
	if (userError || !userData.user) {
		const email = formData.get("email") as string;
		const emailRedirectLink = process.env.NEXT_PUBLIC_SITE_URL + "/callback?next=/";
		const { error: authError, data: authData } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: emailRedirectLink,
			},
		});

		if (authError) {
			return {
				status: "error",
				error: authError.message,
			};
		} else {
			return {
				status: "inProgress",
				error: undefined,
			};
		}
	} else {
		return {
			status: "authenticated",
			error: undefined,
		};
	}
}

export async function registerUser(prevState: RegistrationState, formData: FormData): Promise<RegistrationState> {
	
	
	const supabase = await createClient();
	const id = await supabase.auth.getUser().then(({ data: { user } }) => user?.id);
	const email = await supabase.auth.getUser().then(({ data: { user } }) => user?.email);
	const first_name = formData.get("firstName") as string;
	const last_name = formData.get("lastName") as string;
	const majors = formData.get("major") as string;
	const minors = formData.get("minor") as string;
	const primary_institution = formData.get("primaryInstitution") as string;

	const { data, error } = await supabase.from("students").upsert({
		id,
		email,
		first_name,
		last_name,
		majors,
		minors,
		primary_institution
	}).select().single();

	if (!error) {
		return {
			status: "success",
			error: undefined,
		};
	} else {
		return {
			status: "error",
			error: error.message,
		};
	}
}