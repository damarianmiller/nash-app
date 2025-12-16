import View from "@/components/View/View";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <View>
            {children}
        </View>
    );
}