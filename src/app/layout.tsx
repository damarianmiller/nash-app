import "./global.css";
import TopBar from "@/components/TopBar/TopBar";
import Providers from "@/components/providers";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>Nash App</title>
            </head>
            <body>
                <Providers>
                    <TopBar title="Nash"/>
                    {children}
                </Providers>
            </body>
        </html>
    );
}