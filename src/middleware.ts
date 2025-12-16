// src/middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	let response = NextResponse.next({
		request: { headers: request.headers },
	});

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
					response = NextResponse.next({ request });
					cookiesToSet.forEach(({ name, value, options }) =>
						response.cookies.set(name, value, options)
					);
				},
			},
		}
	);

	// 1. Refresh Session
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// 2. Protect Routes
	const protectedPaths = ["/assignments", "/dashboard", "/courses"];
	const url = request.nextUrl.clone();

	if (!user && protectedPaths.some((path) => url.pathname.startsWith(path))) {
		url.pathname = "/login";
		return NextResponse.redirect(url);
	} else if (!user && url.pathname === "/") {
		url.pathname = "/login";
		return NextResponse.redirect(url);
	}
	return response;
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
