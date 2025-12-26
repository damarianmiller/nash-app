import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
	try {
		const supabase = await createClient();
		const { data: userData, error: userError } = await supabase.auth.getUser();
		const user = userData?.user;
		if (userError) {
			return NextResponse.json(
				{
					authenticated: false,
					registered: false,
					error: userError.message,
				},
				{ status: 200, headers: { "Cache-Control": "no-store" } }
			);
		} else if (!user) {
			return NextResponse.json(
				{ 
					authenticated: false, 
					registered: false,
					error: "No user currently authenticated."
				},
				{ status: 200, headers: { "Cache-Control": "no-store" } }
			);
		}
		const { data: student, error: studentError } = await supabase
			.from("students")
			.select("id")
			.eq("id", user.id)
			.maybeSingle();
		if (studentError) {
			return NextResponse.json(
				{
					authenticated: true,
					registered: false,
					error: studentError.message,
				},
				{ status: 500, headers: { "Cache-Control": "no-store" } }
			);
		} else if (!student) {
			return NextResponse.json(
				{ 
					authenticated: true,
					registered: false,
					error: "No student record found."
				},
				{ status: 200, headers: { "Cache-Control": "no-store" } }
			);
		}
		return NextResponse.json(
			{ 
				authenticated: true,
				registered: !!student,
				error: undefined
			},
			{ status: 200, headers: { "Cache-Control": "no-store" } }
		);
		



	} catch (e: any) {
		console.error("auth-status crashed:", e);
		return NextResponse.json(
			{
				authenticated: false,
				registered: false,
				error: e?.message ?? String(e),
			},
			{ status: 500, headers: { "Cache-Control": "no-store" } }
		);
	}
}
