import TopBar from "@/components/TopBar/TopBar";
import View from "@/components/View/View";
import BottomBar from "@/components/BottomBar/BottomBar";

export default function ApplicationLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <View>
                {children}
            </View>
            <BottomBar/>
        </>
    );
}