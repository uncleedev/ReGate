import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import SigninForm from './instructorSigninForm'

export default async function InstructorSignin() {

    const session = await auth()

    const user = session?.user

    if (user && user.role === 'student') redirect("/student/dashboard")
    if (user && user.role === 'admin') redirect("/admin/dashboard")
    if (user && user.role === 'instructor') redirect("/instructor/dashboard")
      
  return <SigninForm />
}
