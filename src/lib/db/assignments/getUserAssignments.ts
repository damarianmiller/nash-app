import createClient from "@/lib/supabase/server";

export default async function getUserAssignments(user) {
    const supabase = await createClient();
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
        .select("*")
        .in("course_id", courseIds)
        .order("due_date", { ascending: true });

    if (assignmentsError || !assignments) {
        throw new Error("Failed to fetch assignments: " + assignmentsError.message);
    }

    return Next.res;

}