import "./global.css";
import TopBar from "@/components/TopBar/TopBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>Nash App</title>
            </head>
            <body>
                <TopBar title="Nash"/>
                {children}
            </body>
        </html>
    );
}