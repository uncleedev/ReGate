import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import InstructorSignin from "@/components/portal/InstructorSignin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function InstructorSignInPage() {

  const sesion = await getServerSession(authOptions)

  if (sesion) redirect("/instructor/dashboard")

  return <InstructorSignin />
}