import createClient from "../supabase/server";

export async function isEnrolled(user, course) {
    const supabase = await createClient();

    if (!user) {
        return false;
    }
    const { data, error } = await supabase
        .from("enrollments")
        .select("*")
        .eq("student_id", user.id)
        .eq("course_id", course.id)
        .maybeSingle();

    if (!data || error) {
        return false;
    }
    return true;
}