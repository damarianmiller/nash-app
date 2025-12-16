"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase";

export async function login(formData: FormData) {
	const supabase = await createClient();
	const email = formData.get("email") as string;

	if (!email) redirect("/login?error=Email required");

	const { error } = await supabase.auth.signInWithOtp({
		email,
		options: {
			emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
		},
	});

	if (error) redirect("/login?error=Auth failed");

	redirect("/login?message=Check your email");
}

export async function logout() {
	const supabase = await createClient();
	await supabase.auth.signOut();
	revalidatePath("/", "layout");
	redirect("/login");
}
