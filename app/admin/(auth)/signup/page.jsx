import React from 'react'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminSignupForm from './AdminSignupForm';

export default async function AdminSignup() {

    const session = await auth()

    const user = session?.user


    if (user && user.role === 'student') redirect("/student/dashboard")
      if (user && user.role === 'admin') redirect("/admin/dashboard")
      if (user && user.role === 'instructor') redirect("/instructor/dashboard")

  return (
    <AdminSignupForm />
  )
}
