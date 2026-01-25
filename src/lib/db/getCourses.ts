import supabase from "../supabase/client";
import getStudentProfile from "./getStudentProfile";

async function getCourses(term: any) {
    const studentProfile = await getStudentProfile();
    if (!studentProfile) return null;

    const { data: enrollments, error: enrollmentsError } = await supabase
    .from("enrollments")
    .select("course_id")
    .eq("student_id", studentProfile.id)
    .eq("term_id", term);

    if (enrollmentsError) return null;

    const enrolledCourseIds = enrollments.map((enrollment) => enrollment.course_id);

    if (enrolledCourseIds.length > 0) {
        const { data: courses, error: coursesError } = await supabase
        .from("courses")
        .select("*")
        .in("id", enrolledCourseIds)

        return courses;
    }

    return null;
}