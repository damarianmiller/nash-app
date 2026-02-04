import createClient from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 },
        );
    }

    const { data: enrollments, error: enrollmentsError } = await supabase
        .from("enrollments")
        .select("course_id")
        .eq("student_id", user.id);

    if (enrollmentsError || !enrollments) {
        throw new Error("Failed to fetch enrollments: " + enrollmentsError.message);
    }

    const courseIds = enrollments.map(enrollment => enrollment.course_id);

    const { data: assignments, error: assignmentsError } = await supabase
        .from("assignments")
        .select("id, type, title, description, due_date, assigned_date, course: courses(id, code, title, description)")
        .in("course_id", courseIds)
        .order("due_date", { ascending: true });

    if (assignmentsError || !assignments) {
        throw new Error("Failed to fetch assignments: " + assignmentsError.message);
    }

    return NextResponse.json(assignments);

}