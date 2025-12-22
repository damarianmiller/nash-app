import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getClaims();

	return NextResponse.json(
		{ authenticated: !!data && !error },
		{ headers: { "Cache-Control": "no-store" } }
	);
}
