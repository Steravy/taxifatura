import { auth } from "@/lib/auth";
import Dashboard from "./dashboard"
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) redirect("/login");

    return (<Dashboard />)
}
