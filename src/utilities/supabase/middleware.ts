import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
	// 1. Create the response object early so we can modify its headers
	let supabaseResponse = NextResponse.next({
		request,
	});

	// 2. Setup the Supabase client
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) =>
						request.cookies.set(name, value)
					);
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options)
					);
				},
			},
		}
	);

	// 3. Get the current user
	// This refreshes the session automatically if needed
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// ==========================================
	// 🛡️ BOUNCER LOGIC STARTS HERE
	// ==========================================

	// A. Define which pages need protection
	// You can add more here later, like '/dashboard' or '/profile'
	const protectedPaths = ["/","/assignments","/courses"];

	// B. Check where the user is trying to go
	const url = request.nextUrl.clone();
	const isTryingToAccessProtectedParams = protectedPaths.some((path) =>
		url.pathname.startsWith(path)
	);

	// C. The Rule: If NO user AND trying to access protected page -> Kick to Login
	if (!user && isTryingToAccessProtectedParams) {
		url.pathname = "/login";
		return NextResponse.redirect(url);
	}
	return supabaseResponse;
}
