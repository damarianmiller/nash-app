import View from "@/Components/Containers/View/View";
import BottomBar from "@/Components/Containers/BottomBar/BottomBar";
import supabase from "@/lib/supabase/client";
import { redirect } from "next/navigation";

const pages = [
    { icon: "layout-dashboard", label: "Dashboard", href: "/" },
    { icon: "notebook-pen", label: "Assignments", href: "/assignments" },
    { icon: "apple", label: "Courses", href: "/courses" },
]


export default async function ApplicationLayout({ children }: { children: React.ReactNode }) {
        const { data: { user } } = await supabase.auth.getUser();
        console.log(user);
        if (!user) {
           // redirect("/access");
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