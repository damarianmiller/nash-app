import { type NextRequest } from "next/server";
import { updateSession } from "@/utilities/supabase/middleware";

export async function middleware(request: NextRequest) {
	return await updateSession(request);
}

export const config = {
	// This "matcher" tells Next.js: "Run this middleware on ALL pages,
	// EXCEPT for static images, fonts, and the favicon."
	// We don't need to check authentication for a JPG file.
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
