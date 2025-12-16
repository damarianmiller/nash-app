"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utilities/supabase/server";

export async function login(formData: FormData) {
	const supabase = await createClient();

	const email = formData.get("email") as string;

	if (!email) {
		redirect("/login?error=Email is required");
	}

	const { error } = await supabase.auth.signInWithOtp({
		email,
		options: {
			emailRedirectTo: `${
				process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
			}/callback`,
		},
	});

	if (error) {
		redirect("/login?error=Could not authenticate user");
	}

	revalidatePath("/", "layout");
	redirect("/login?message=Check email to continue sign in process");
}
