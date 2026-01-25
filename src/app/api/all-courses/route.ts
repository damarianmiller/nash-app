import { NextResponse } from "next/server";
import createClient from "@/lib/supabase/server";

type Course = {
    id: string;
    title: string;
    code: string;
    description: string;
    credit_hours: number;
};

export async function GET() {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
        return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 },
        );
    }
    const { data: studentInstitution, error: studentInstitutionError } = await supabase
        .from("students_institutions")
        .select("institution_id")
        .eq("student_id", user.id)
        .maybeSingle();

    if (studentInstitutionError || !studentInstitution) {
        return NextResponse.json(
            { error: "Failed to retrieve student institution" },
            { status: 500 },
        );
    }
    const { data: courses, error } = await supabase
        .from("courses")
        .select("id, title, code, description, credit_hours")
        .eq("institution_id", studentInstitution.institution_id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(courses);
}