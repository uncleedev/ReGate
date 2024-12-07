"use client"

export const StudentMenu = [
    {
        name: "Dashboard",
        icon: require("@/public/icons/dashboard.png"),
        link: "/student/dashboard",
    },
    {
        name: "Schedules",
        icon: require("@/public/icons/schedules.png"),
        link: "/student/schedules",
    },
    {
        name: "Grades",
        icon: require("@/public/icons/grades.png"),
        link: "/student/grades",
    },
    {
        name: "Requests",
        icon: require("@/public/icons/forms.png"),
        link: "/student/requests",
    }
]

export const InstructorMenu = [
    {
        name: "Dashboard",
        icon: require("@/public/icons/dashboard.png"),
        link: "/instructor/dashboard",
    },
    {
        name: "Schedules",
        icon: require("@/public/icons/schedules.png"),
        link: "/instructor/schedules",
    },
    {
        name: "Requests",
        icon: require("@/public/icons/forms.png"),
        link: "/instructor/requests",
    }
]


export const AdminMenu = [
    {
        name: "Dashboard",
        icon: require("@/public/icons/dashboard.png"),
        link: "/admin/dashboard",
    },
    {
        name: "News & Events",
        icon: require("@/public/icons/news.png"),
        link: "/admin/news-events",
    },
    {
        name: "Announcements",
        icon: require("@/public/icons/announcement.png"),
        link: "/admin/announcements",
    },
    {
        name: "Requests",
        icon: require("@/public/icons/requests.png"),
        link: "/admin/requests",
    }
]