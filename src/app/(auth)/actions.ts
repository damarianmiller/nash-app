"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase";

export async function login(formData: FormData) {
	const supabase = await createClient();
	const email = formData.get("email") as string;
	if (!email) redirect("/access?error=Email required");
	const { error } = await supabase.auth.signInWithOtp({
		email,
		options: {
			emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/callback`,
		},
	});

	if (error) {
		redirect("/access?error=Auth failed")
	};

	redirect("/access?link-sent=true");
}

export async function register(formData: FormData) {
	const supabase = await createClient();
	const firstName = formData.get("firstName") as string;
	const lastName = formData.get("lastName") as string;
	const phone = formData.get("phone") as string;
	const major = formData.get("major") as string;


	const {} = await si

}

export async function logout() {
	const supabase = await createClient();
	await supabase.auth.signOut();
	revalidatePath("/", "layout");
	redirect("/login");
}
