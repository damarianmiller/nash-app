import createClient from "@/lib/supabase/server";
export async function getUser() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        return null;
    }
    const user = data?.user ?? null;
    if (!user) {
        return null;
    }
    return user;
}