import createClient from "@/lib/supabase/server";
import { getUser } from "@/lib/auth/getUser";


type StudentProfile = {
	id: string;
	first_name: string | null;
	last_name: string | null;
	email: string | null | undefined;
	institutions: string[];
};

export default async function getStudentProfile(): Promise<StudentProfile | null> {
    const supabase = await createClient();

    const user = await getUser();
    if (!user) return null;
    
    const email = user.email;

    const { data: student, error: studentError } = await supabase
    .from("students")
    .select("id, first_name, last_name")
    .eq("user_id", user.id)
    .maybeSingle();

    if (!student || studentError) return null;

    const student_id = student?.id;
    const first_name = student?.first_name;
    const last_name = student?.last_name;

    const { data: institutions, error: institutionsError } = await supabase
    .from("student_institutions")
    .select("institution_id")
    .eq("student_id", student_id);

    if (institutionsError) return null;

    const institution_ids = institutions.map((institution) => institution.institution_id);

    return {
        id: student_id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        institutions: institution_ids
    }
}