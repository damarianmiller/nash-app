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

    const { data: enrollments, error: enrollmentsError } = await supabase
        .from("enrollments")
        .select("course: courses(id, title, code, description, credit_hours), term:terms!inner(id, name, start_date, end_date)")
        .eq("student_id", user.id)
        .gte("term.end_date", new Date().toISOString())
        .lte("term.start_date", new Date().toISOString());

    if (enrollmentsError || !enrollments) {
        return NextResponse.json({ error: enrollmentsError.message }, { status: 500 });
    }

    const courses = enrollments.map(enrollment => ({
        id: enrollment.course.id,
        title: enrollment.course.title,
        code: enrollment.course.code,
        description: enrollment.course.description,
        credit_hours: enrollment.course.credit_hours
    }));

    return NextResponse.json(courses);
}