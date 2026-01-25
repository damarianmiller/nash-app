import { NextResponse } from "next/server";
import createClient from "@/lib/supabase/server";

export async function GET(req: Request) {
	const url = new URL(req.url);
	const code = url.searchParams.get("code");

	if (code) {
		const supabase = await createClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		await new Promise((r) => setTimeout(r, 0));

		if (error) {
			return NextResponse.redirect(
				new URL("/access?error=callback", url.origin),
			);
		}
	}
	return NextResponse.redirect(new URL("/access", url.origin));
}
