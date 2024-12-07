
import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import StudentSigninForm from './StudentSigninForm';

export default async function StudentSignin() {

    const session = await auth()

    const user = session?.user

    if (user && user.role === 'student') redirect("/student/dashboard")
    if (user && user.role === 'admin') redirect("/admin/dashboard")
    if (user && user.role === 'instructor') redirect("/instructor/dashboard")

    return (
        <div>
            <StudentSigninForm />
        </div>
    );
}