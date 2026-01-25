import { getUser } from "@/lib/auth/getUser";
import AccessUI from "./AccessUI";

export default async function AccessPage() {
    const user = await getUser();
    console.log(user);
    return <AccessUI user={user} />;
}
