#! /usr/bin/env node

import inquirer from 'inquirer';
let ID = -1;
function generateID() {
    ID++;
    return ID;
}
class Student {
    constructor(name, balance) {
        this.studentID = generateID();
        this.name = name;
        this.coursesEnrolled = [];
        this.balance = balance;
    }
    showDetails() {
        console.log(`******** Student Details ******** `);
        console.log(`Student ID: ${this.studentID}`);
        console.log(`Name: ${this.name}`);
        console.log(`Balance: ${this.balance}`);
        console.log(`******** Courses Enrolled ******** `);
        let i = 1;
        for (let course of this.coursesEnrolled) {
            console.log(`${i}.  ${course.name}`);
            i++;
        }
        console.log(` `);
    }
    enrollCourse(course) {
        if (this.balance < course.fee) {
            console.log(`Insufficient balance (i.e. ${this.balance}) to enroll in this course having a fee of Rs. ${course.fee}!`);
            console.log(` `);
        }
        else {
            this.coursesEnrolled.push(course);
            course.addStudentCount();
            this.balance -= course.fee;
            console.log("Course Successfully Enrolled!");
            console.log(`Rs. ${course.fee} successfully dedcuted. Remaining balance is ${this.balance}`);
            console.log(` `);
        }
    }
    viewBalance() {
        console.log("Remaining Balance: Rs. " + this.balance);
    }
}
class Course {
    constructor(name, instructor, creditHours, fee) {
        this.name = name;
        this.instructor = instructor;
        this.creditHours = creditHours;
        this.studentsEnrolled = 0;
        this.fee = fee;
    }
    showDetails() {
        console.log(`******** Course Details ******** `);
        console.log(`Name: ${this.name}`);
        console.log(`Instructor: ${this.instructor.name}`);
        console.log(`Credit Hours: ${this.creditHours}`);
        console.log(`Total Students Enrolled: ${this.studentsEnrolled}`);
        console.log(`Fee: Rs.${this.fee}`);
        console.log(` `);
    }
    addStudentCount() {
        this.studentsEnrolled++;
    }
}
class Faculty {
    constructor(name, department) {
        this.name = name;
        this.department = department;
    }
    showDetails() {
        console.log(`******** Faculty Details ******** `);
        console.log(`Name: ${this.name}`);
        console.log(`Department: ${this.department}`);
        console.log(` `);
    }
}
let action = '';
const students = [];
const courses = [];
const faculties = [];
while (action != 'Quit') {
    let input = await inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "Welcome to PIAIC Student LMS! Select the desired action to proceed further:",
            choices: ['Add Student', 'Add Course', 'Add Faculty', 'Enroll Student in Course', 'Show Student Details', 'Show Course Details', 'Show Faculty Details', 'Show All Students', 'Show All Courses', 'Show All Faculties', 'Quit']
        }
    ]);
    action = input.action;
    switch (input.action) {
        case 'Quit':
            break;
        case 'Add Student':
            let student = await inquirer.prompt([
                {
                    name: "name",
                    type: "string",
                    message: "Student Name:"
                },
                {
                    name: "balance",
                    type: "number",
                    message: "Initial Balance (Rs.):"
                }
            ]);
            const newStudent = new Student(student.name, student.balance);
            students.push(newStudent);
            break;
        case 'Add Course':
            let course = await inquirer.prompt([
                {
                    name: "name",
                    type: "string",
                    message: "Course Name:"
                },
                {
                    name: "facultyID",
                    type: "number",
                    message: "Faculty Member ID:"
                },
                {
                    name: "creditHours",
                    type: "number",
                    message: "Credit Hours:"
                },
                {
                    name: "fee",
                    type: "number",
                    message: "Fee (Rs.):"
                }
            ]);
            // find the Faculty object corresponding to the name of the Faculty member provided by user
            if (faculties[course.facultyID]) {
                const newCourse = new Course(course.name, faculties[course.facultyID], course.creditHours, course.fee);
                courses.push(newCourse);
            }
            else {
                console.log("Provided faculty ID doesn't exist!");
            }
            break;
        case 'Add Faculty':
            let faculty = await inquirer.prompt([
                {
                    name: "name",
                    type: "string",
                    message: "Faculty Name:"
                },
                {
                    name: "department",
                    type: "string",
                    message: "Faculty Department:"
                }
            ]);
            const newFaculty = new Faculty(faculty.name, faculty.department);
            faculties.push(newFaculty);
            break;
        case 'Enroll Student in Course':
            let details = await inquirer.prompt([
                {
                    name: "studentID",
                    type: "number",
                    message: "Student ID:"
                },
                {
                    name: "courseID",
                    type: "number",
                    message: "Course ID:"
                }
            ]);
            students[details.studentID].enrollCourse(courses[details.courseID]);
            break;
        case 'Show Student Details':
            let studentDetails = await inquirer.prompt([
                {
                    name: "id",
                    type: "number",
                    message: "Enter Student ID"
                }
            ]);
            console.log(students[studentDetails.id].showDetails());
            break;
        case 'Show Course Details':
            let courseDetails = await inquirer.prompt([
                {
                    name: "id",
                    type: "number",
                    message: "Enter Course ID"
                }
            ]);
            console.log(courses[courseDetails.id].showDetails());
            break;
        case 'Show Faculty Details':
            let facultyDetails = await inquirer.prompt([
                {
                    name: "id",
                    type: "number",
                    message: "Enter Faculty ID"
                }
            ]);
            console.log(faculties[facultyDetails.id].showDetails());
            break;
        case 'Show All Students':
            console.log(`******** All Students (ID and Names) ******** `);
            for (let i = 0; i < students.length; i++) {
                console.log(i + ": " + students[i].name);
            }
            console.log(" ");
            break;
        case 'Show All Courses':
            console.log(`******** All Courses (ID and Names) ******** `);
            for (let i = 0; i < courses.length; i++) {
                console.log(i + ": " + courses[i].name);
            }
            console.log(" ");
            break;
        case 'Show All Faculties':
            console.log(`******** All Faculty Members (ID and Names) ******** `);
            for (let i = 0; i < faculties.length; i++) {
                console.log(i + ": " + faculties[i].name);
            }
            console.log(" ");
            break;
        default:
            break;
    }
}
