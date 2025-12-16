import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
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

	// A. Define which pages need protection
	const protectedPaths = ["/assignments", "/courses", "/dashboard"];

	// B. Check where the user is trying to go
	const url = request.nextUrl.clone();

	// Check if the current path starts with any of the protected paths
	const isProtected = protectedPaths.some((path) =>
		url.pathname.startsWith(path)
	);

	// OPTIONAL: If you want to protect the home page "/" specifically
	// check for it exactly, not using startsWith
	const isHomePage = url.pathname === "/";

	// C. The Rule: If NO user...
	if (!user) {
		// ...AND trying to access a protected page OR the home page
		if (isProtected || isHomePage) {
			url.pathname = "/login";
			return NextResponse.redirect(url);
		}
	}

	return supabaseResponse;
}
