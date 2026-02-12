import View from "@/Components/Containers/View/View";
import BottomBar from "@/Components/Containers/BottomBar/BottomBar";
import createClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const pages = [
    { icon: "layout-dashboard", label: "Dashboard", href: "/" },
    { icon: "notebook-pen", label: "Assignments", href: "/assignments" },
    { icon: "apple", label: "Courses", href: "/courses" },
]


export default async function ApplicationLayout({ children }: { children: React.ReactNode }) {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            redirect("/access");
        }
    return (
        <>
            <View>
                {children}
            </View>
            <BottomBar pages={pages}/>
        </>
    );
}