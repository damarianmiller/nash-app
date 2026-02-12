import { getUser } from "@/lib/auth/getUser";
import createClient from "@/lib/supabase/server";
import AccessUI from "./AccessUI";

export default async function AccessPage() {
    const user = await getUser();


    const supabase = await createClient();
    const { data: student, error} = await supabase
    .from("students")
    .select("*")
    .eq("id", user?.id)
    .single();

    return <AccessUI user={user} student={student} />;
}
