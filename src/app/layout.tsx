import "@/global.css";
import Providers from "@/Components/Providers/Providers";
import TopBar from "@/Components/Containers/TopBar/TopBar";

import localFont from "next/font/local";
const themeFont = localFont({
    src: "../../public/fonts/Unbounded/Unbounded.ttf",
    display: "swap",
    variable: "--font-theme"
});

export const viewport = {
    width: "device-width",
    initalScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={themeFont.variable}>
            <head>
                <title>Nash App</title>
            </head>
            <body>
                <Providers>
                    <TopBar/>
                    {children}
                </Providers>
            </body>
        </html>
    );
}