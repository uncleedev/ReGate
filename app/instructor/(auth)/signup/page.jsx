import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import InstructorSignUpForm from './InstructorSignupForm'

export default async function InstructorSignup() {

    const session = await auth()

    const user = session?.user

    if (user && user.role === 'student') redirect("/student/dashboard")
    if (user && user.role === 'admin') redirect("/admin/dashboard")
    if (user && user.role === 'instructor') redirect("/instructor/dashboard")
        
    return <InstructorSignUpForm />

}
