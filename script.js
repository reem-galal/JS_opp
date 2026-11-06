
// ========================================
// 1. Student Class
// ========================================

class Student {

    constructor(id, name, grades, attendance) {

        this.id = id;
        this.name = name;
        this.grades = grades;
        this.attendance = attendance;

    }


    // Calculate Average using reduce
    calculateAverage() {

        const total = this.grades.reduce(
            (sum, grade) => sum + grade, 0
        );

        return total / this.grades.length;

    }


    // Calculate Grade
    getGrade(average) {

        if (average >= 90) {
            return "A";
        } else if (average >= 80) {
            return "B";
        } else if (average >= 70) {
            return "C";
        } else if (average >= 60) {
            return "D";
        } else if (average >= 50) {
            return "E";
        } else {
            return "F";
        }

    }


    // Final Result
    getFinalResult() {

        const average = this.calculateAverage();

        if (average >= 50 && this.attendance >= 75) {
            return "ناجح";
        } else {
            return "يحتاج مراجعة";
        }

    }

}


// ========================================
// 2. Students List
// ========================================

const studentsList = [

    new Student(101, "Ahmed", [80, 90, 85], 95),

    new Student(102, "Mona", [45, 48, 42], 80),

    new Student(103, "Ali", [40, 43, 45], 90),

    new Student(104, "Sara", [60, 70, 65], 70)

];


// ========================================
// 3. Academic Reports
// ========================================

console.log("===== All Students Report =====");

studentsList.forEach(student => {

    const average = student.calculateAverage();

    console.log({

        ID: student.id,
        Name: student.name,
        Average: average.toFixed(2),
        Grade: student.getGrade(average),
        Result: student.getFinalResult()

    });

});


// ========================================
// 4. Grace Committee - Filter
// ========================================

const weakStudents = studentsList.filter(student => {

    const average = student.calculateAverage();

    return average >= 40 && average <= 49;

});


// ========================================
// 5. Grace Committee - Map
// ========================================

const graceStudents = weakStudents.map(student => {

    return {

        id: student.id,
        name: student.name,

        oldAverage: student.calculateAverage(),

        newAverage: student.calculateAverage() + 5

    };

});


// ========================================
// 6. Grace Committee - Reduce
// ========================================

const totalNewAverages = graceStudents.reduce(

    (sum, student) => sum + student.newAverage, 0

);


// ========================================
// 7. Average with Zero Protection
// ========================================

const graceAverage = graceStudents.length > 0

    ? totalNewAverages / graceStudents.length

    : 0;


// ========================================
// 8. Dashboard Statistics
// ========================================

const passedStudents = studentsList.filter(

    student => student.getFinalResult() === "ناجح"

);

const reviewStudents = studentsList.filter(

    student => student.getFinalResult() === "يحتاج مراجعة"

);


document.getElementById("totalStudents").textContent =
    studentsList.length;

document.getElementById("passedStudents").textContent =
    passedStudents.length;

document.getElementById("reviewStudents").textContent =
    reviewStudents.length;

document.getElementById("graceStudentsCount").textContent =
    graceStudents.length;


// ========================================
// 9. Display Students Table
// ========================================

const studentsTable = document.getElementById("studentsTable");

studentsList.forEach(student => {

    const average = student.calculateAverage();

    const result = student.getFinalResult();

    const resultClass = result === "ناجح"
        ? "success"
        : "warning";

    studentsTable.innerHTML += `

        <tr>

            <td>${student.id}</td>

            <td class="student-name">${student.name}</td>

            <td>${average.toFixed(2)}</td>

            <td class="grade">${student.getGrade(average)}</td>

            <td>${student.attendance}%</td>

            <td>
                <span class="badge ${resultClass}">
                    ${result}
                </span>
            </td>

        </tr>

    `;

});


// ========================================
// 10. Display Grace Committee Table
// ========================================

const graceTable = document.getElementById("graceTable");

if (graceStudents.length > 0) {

    graceStudents.forEach(student => {

        graceTable.innerHTML += `

            <tr>

                <td>${student.id}</td>

                <td class="student-name">${student.name}</td>

                <td>${student.oldAverage.toFixed(2)}</td>

                <td class="grade">${student.newAverage.toFixed(2)}</td>

            </tr>

        `;

    });

} else {

    graceTable.innerHTML = `
        <tr>
            <td colspan="4">لا يوجد طلاب تنطبق عليهم شروط الرأفة</td>
        </tr>
    `;

}


// ========================================
// 11. Display Grace Average
// ========================================

document.getElementById("graceAverage").textContent =
    graceAverage.toFixed(2);


// ========================================
// 12. Console Outputs
// ========================================

console.log("===== Grace Committee =====");

console.table(graceStudents);

console.log("Grace Average:", graceAverage.toFixed(2));
