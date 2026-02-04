import { NextResponse } from "next/server";
import createClient from "@/lib/supabase/server";

type Course = {
    id: string;
    title: string;
    code: string;
    description: string;
    credit_hours: number;
};

type Institution = {
    id: string;
    name: string;
    slug: string;
    courses: Course[];
}

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
        .select("institution: institutions(id, name, slug, courses(id, title, code, description, credit_hours))")
        .eq("student_id", user.id)

    if (studentInstitutionError || !studentInstitution) {
        return NextResponse.json(
            { error: "Failed to retrieve student institution" },
            { status: 500 },
        );
    }

    

    // data is like [{ institution: { ... , courses: [...] } }, ...]
    const institutions = (studentInstitution ?? [])
    .map((row) => row.institution)
    .filter(Boolean);

    return NextResponse.json(institutions);
}