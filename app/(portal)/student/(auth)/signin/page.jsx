import StudentSignin from "@/components/portal/StudentSignin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function StudentSignInPage() {

  const session = await getServerSession(authOptions)

  if (session) redirect("/student/dashboard")

  return <StudentSignin />
}