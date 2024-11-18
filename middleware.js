export { default } from "next-auth/middleware"

export const config = {
    matcher: ["/student/dashboard", "/student/schedules", "/student/grades", "/student/requests"]
}