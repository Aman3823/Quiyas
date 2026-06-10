import { Temporal } from "@js-temporal/polyfill";

import { Student, isStudent, parseStudent } from "./models/student.model";
import { AssessmentItem, calculateGrade } from "./models/assessment.model";
import {
    EnrollmentStatus,
    describeEnrollment,
} from "./models/enrollment.model";
import {
    Course,
    CourseStatus,
    describeCourse,
} from "./models/coures.model";
import {
    ApiResponse,
    renderResponse,
} from "./models/api-response.model";

/* ---------------- Student ---------------- */

const student: Student = {
    id: "STU-001",
    name: "HANA TADESSE",
    enrollmentDate: Temporal.Now.instant(),
};

console.log(student.gpa?.toFixed(2) ?? "Not yet graded");

/* ---------------- Type Guard Example ---------------- */

function processStudent(raw: unknown): void {
    if (isStudent(raw)) {
        const gpaDisplay = raw.gpa?.toFixed(2) ?? "Not yet graded";
        console.log(`Student ${raw.name} GPA: ${gpaDisplay}`);
    } else {
        console.error("Invalid student data received");
    }
}

const parsedStudent = parseStudent({
    id: "STU-001",
    name: "Hana",
});

console.log(parsedStudent);

processStudent({
    id: "STU-001",
    name: "Hana",
    gpa: 3.7,
});

/* ---------------- Assessment ---------------- */

const quiz: AssessmentItem = {
    id: "QUIZ-001",
    kind: "Quiz",
    title: "SQL BASIC",
    correctAnswers: 8,
    totalQuestions: 10,
};

const lab: AssessmentItem = {
    id: "LAB-001",
    kind: "Lab",
    title: "REST API PROJECT",
    functionalityScore: 85,
    codeQualityScore: 90,
};

console.log(`Quiz grade: ${calculateGrade(quiz)}%`);
console.log(`Lab grade: ${calculateGrade(lab)}%`);

/* ---------------- Enrollment ---------------- */

const pending: EnrollmentStatus = {
    status: "PENDING",
    requestedAt: Temporal.Now.instant(),
    studentId: "STU-001",
    courseId: "CRS-101",
};

console.log(describeEnrollment(pending));

const activeEnrollment: EnrollmentStatus = {
    status: "ACTIVE",
    startDate: Temporal.PlainDate.from("2026-09-01"),
    currentGrade: 88,
};

console.log(describeEnrollment(activeEnrollment));

/* ---------------- Course ---------------- */

const webDev: CourseStatus = {
    status: "ACTIVE",
    enrolledCount: 28,
    startDate: Temporal.PlainDate.from("2026-09-01"),
};

console.log(describeCourse(webDev));

/* ---------------- Student API Response ---------------- */

const studentRes: ApiResponse<Student> = {
    status: "success",
    data: {
        id: "STU-001",
        name: "Dawit Bekele",
        enrollmentDate: Temporal.Now.instant(),
        gpa: 3.4,
    },
    fetchedAt: Temporal.Now.instant(),
};

console.log(
    renderResponse(
        studentRes,
        (s) => `${s.name} GPA: ${s.gpa ?? "N/A"}`
    )
);

/* ---------------- Course List API Response ---------------- */

const courseListRes: ApiResponse<Course[]> = {
    status: "success",
    data: [
        {
            id: "CRS-101",
            title: "Web Development Fundamentals",
            capacity: 30,
            startDate: Temporal.PlainDate.from("2026-09-01"),
        },
        {
            id: "CRS-102",
            title: "TypeScript Fundamentals",
            capacity: 25,
            startDate: Temporal.PlainDate.from("2026-10-01"),
        },
    ],
    fetchedAt: Temporal.Now.instant(),
};

console.log(
    renderResponse(
        courseListRes,
        (courses) => courses.map((c) => c.title).join(", ")
    )
);

/* ---------------- Temporal Examples ---------------- */

// 1. Record the exact moment an enrollment is approved

const approvedAt = Temporal.Now.instant();

console.log(`Approved at (UTC): ${approvedAt}`);

// 2. Display in different time zones

const addisTime =
    approvedAt.toZonedDateTimeISO("Africa/Addis_Ababa");

const londonTime =
    approvedAt.toZonedDateTimeISO("Europe/London");

console.log(`Addis: ${addisTime.toPlainTime()}`);
console.log(`London: ${londonTime.toPlainTime()}`);

// 3. Course start date calculation

const courseStart = Temporal.PlainDate.from("2026-09-01");
const today = Temporal.Now.plainDateISO();

const startDuration = today.until(courseStart, {
    largestUnit: "days",
});

console.log(
    `${startDuration.days} days until course starts`
);

// 4. Assignment deadline calculation

const deadline = Temporal.PlainDate.from("2026-12-15");

const remaining = today.until(deadline, {
    largestUnit: "days",
});

console.log(
    `${remaining.days} days until assignment is due`
);