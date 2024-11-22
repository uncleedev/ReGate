import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import InstructorSignin from "@/components/portal/InstructorSignin"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function InstructorSignInPage() {
  const session = await getServerSession(authOptions)

  if (session && session.user && session.user.instructorNo) {
    return redirect("/instructor/dashboard")
  }

  return <InstructorSignin />
}
