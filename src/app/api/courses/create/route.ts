import createClient from "@/lib/supabase/server";
import { NextResponse } from "next/server";

type CreateCourseRequestBody = {
    title: string;
    code: string;
    description: string;
    credit_hours: number;
    institution_id: string;
}

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: CreateCourseRequestBody;
    try {
        body = await request.json();
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const title = body.title?.trim();
    const code = body.code?.trim();
    const description = body.description?.trim();
    const credit_hours = Number(body.credit_hours);
    const institution_id = body.institution_id;

    if (!title || !code || !description || !Number.isFinite(credit_hours) || !institution_id) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data: course, error: insertError } = await supabase
        .from("courses")
        .insert({
            title,
            code,
            description,
            credit_hours,
            institution_id,
            created_by: user.id,
        })
        .select("*")
        .single();
    
    if (insertError) {
        console.error("Error inserting course:", insertError);
        return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
    }

    return NextResponse.json(course, { status: 201 });
}