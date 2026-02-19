import createClient from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json({ error: userError?.message || "User not authenticated" }, { status: 401 });
    }

    const { data: institutions, error: institutionsError } = await supabase
        .from("students_institutions")
        .select("institution: institutions(id, name)")
        .eq("student_id", user.id);

    if (institutionsError || !institutions) {
        return NextResponse.json({ error: institutionsError?.message || "Failed to fetch institutions" }, { status: 500 });
    }

    return NextResponse.json(institutions.map(({ institution }) => institution));
}