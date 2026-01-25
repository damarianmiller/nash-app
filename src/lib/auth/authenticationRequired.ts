import { redirect } from "next/navigation";
import { getCurrentUser } from "./getUser";

export async function authenticationRequired() {
	const user = await getCurrentUser();
	if (!user) redirect("/access");
	return user;
}
