import { NextResponse } from "next/server";
import { createClient } from "@/utilities/supabase/server";

export async function GET(request: Request) {
	// 1. Grab the 'code' and 'next' (redirect path) from the URL
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/?login=success";

	if (code) {
		// 2. Create the Supabase client
		const supabase = await createClient();

		// 3. Exchange the temporary code for a permanent Session Cookie
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			// 4. If successful, forward the user to their destination (or home)
			return NextResponse.redirect(`${origin}${next}`);
		}
	}

	// 5. If something broke, send them to an error page
	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
