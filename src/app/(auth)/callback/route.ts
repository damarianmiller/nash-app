import { NextResponse } from "next/server";
// Make sure this points to your NEW location from the cleanup
import { createClient } from "@/lib/supabase";

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/";

	if (code) {
		const supabase = await createClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (user?.email) {
				// 2. Check if they exist in your 'students' table
				const { data: student } = await supabase
					.from("students")
					.select("id")
					.eq("email", user.email)
					.single();

				// 3. If NOT found, force them to Register
				if (!student) {
					return NextResponse.redirect(`${origin}/register`);
				}
			}

			// 4. Found them? Send them to dashboard
			return NextResponse.redirect(`${origin}${next}`);
		}
	}

	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
