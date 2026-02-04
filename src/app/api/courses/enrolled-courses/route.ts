import { NextResponse } from "next/server";
import createClient from "@/lib/supabase/server";

type Course = {
	id: string;
	title: string;
	code: string;
	description: string;
	credit_hours: number;
};

type Term = {
	id: string;
	name: string;
	start_date: string;
	end_date: string;
	courses: Course[];
};

export async function GET() {
	const supabase = await createClient();
	const { data: { user }, error: userError} = await supabase.auth.getUser();

	if (userError || !user) {
		return NextResponse.json(
			{ error: "Not authenticated" },
			{ status: 401 },
		);
	}
	const { data: enrollments, error } = await supabase
		.from("enrollments")
		.select("course: courses(id, title, code, description, credit_hours), term: terms(id, name, start_date, end_date)")
		.eq("student_id", user.id);

	if (error || !enrollments) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	const terms = new Map();

	for (const enrollment of enrollments) {
		const term = enrollment.term.id;
		if (!terms.has(term)) {
			terms.set(term, {
				...enrollment.term,
				courses: [] as Course[],
			});
		}

		terms.get(term).courses.push(enrollment.course);
	}

	return NextResponse.json(Array.from(terms.values()));
}
