import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
	const cookieStore = await cookies();

	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					try {
						cookiesToSet.forEach(({ name, value, options }) =>
							cookieStore.set(
								name,
								value,
								options as CookieOptions
							)
						);
					} catch {
						// setAll can be called from Server Components where cookies are read-only.
						// If you have middleware/proxy refreshing sessions, you can ignore this. :contentReference[oaicite:5]{index=5}
					}
				},
			},
		}
	);
}
