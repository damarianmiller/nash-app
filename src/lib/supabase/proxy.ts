import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
	let response = NextResponse.next({ request });

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					// Keep request cookies in sync (so downstream server code sees the refreshed session)
					cookiesToSet.forEach(({ name, value }) =>
						request.cookies.set(name, value)
					);

					// Recreate response and attach cookies (so browser receives refreshed session)
					response = NextResponse.next({ request });
					cookiesToSet.forEach(({ name, value, options }) => {
						response.cookies.set(name, value, options);
					});
				},
			},
		}
	);

	// Important: this refreshes session if needed and validates the JWT. :contentReference[oaicite:8]{index=8}
	await supabase.auth.getClaims();

	return response;
}