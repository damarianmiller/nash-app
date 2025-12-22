import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
	const supabase = await createClient();

	// Safer than getSession() when reading identity from cookies. :contentReference[oaicite:1]{index=1}
	const { data: userData, error: userErr } = await supabase.auth.getUser();
	const user = userData?.user;

	if (userErr || !user) {
		return NextResponse.json(
			{ authenticated: false, next: "/access" },
			{ status: 401, headers: { "Cache-Control": "no-store" } }
		);
	}

	const { data: student, error } = await supabase
		.from("students")
		.select("user_id")
		.eq("user_id", user.id)
		.maybeSingle();

	if (error) {
		return NextResponse.json(
			{ authenticated: true, error: "student_lookup_failed" },
			{ status: 500, headers: { "Cache-Control": "no-store" } }
		);
	}

	const registered = !!student;

	return NextResponse.json(
		{
			authenticated: true,
			registered,
			next: registered ? "/" : "/access?error=unregistered_user",
		},
		{ headers: { "Cache-Control": "no-store" } }
	);
}
