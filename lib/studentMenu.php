<?php
header('Content-Type: application/json');

$studentMenu = [
    [
        "name" => "Dashboard",
        "link" => "/student/dashboard",
    ],
    [
        "name" => "Schedules",
        "link" => "/student/schedules",
    ],
    [
        "name" => "Grades",
        "link" => "/student/grades",
    ],
    [
        "name" => "Requests",
        "link" => "/student/requests",
    ]
];

echo json_encode($studentMenu);
?>