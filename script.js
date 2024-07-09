// sample data, replace with your own data
let classmates = [
    { name: "John Doe", monday: "active", tuesday: "absent", wednesday: "active", thursday: "active", friday: "absent", saturday: "absent", sunday: "absent" },
    { name: "Jane Doe", monday: "absent", tuesday: "active", wednesday: "absent", thursday: "active", friday: "active", saturday: "absent", sunday: "absent" },
    { name: "Bob Smith", monday: "active", tuesday: "active", wednesday: "absent", thursday: "absent", friday: "active", saturday: "absent", sunday: "absent" },
    // add more classmates here
];

const tableBody = document.getElementById("attendance-data");
const classmateNameInput = document.getElementById("classmate-name");
const daySelect = document.getElementById("day-select");
const updateAttendanceButton = document.getElementById("update-attendance");
const summaryTableContainer = document.getElementById("summary-table-container");

classmates.forEach((classmate) => {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
        <td>${classmate.name}</td>
        <td>${classmate.monday}</td>
        <td>${classmate.tuesday}</td>
        <td>${classmate.wednesday}</td>
        <td>${classmate.thursday}</td>
        <td>${classmate.friday}</td>
        <td>${classmate.saturday}</td>
        <td>${classmate.sunday}</td>
    `;
    tableBody.appendChild(tableRow);
});

updateAttendanceButton.addEventListener("click", () => {
    const classmateName = classmateNameInput.value.trim();
    const day = daySelect.value;
    if (classmateName && day) {
        const classmateIndex = classmates.findIndex((classmate) => classmate.name === classmateName);
        if (classmateIndex!== -1) {
            classmates[classmateIndex][day] = "active";
            updateTable();
            generateSummaryTable();
        }
    }
});

function updateTable() {
    tableBody.innerHTML = "";
    classmates.forEach((classmate) => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td>${classmate.name}</td>
            <td>${classmate.monday}</td>
            <td>${classmate.tuesday}</td>
            <td>${classmate.wednesday}</td>
            <td>${classmate.thursday}</td>
            <td>${classmate.friday}</td>
            <td>${classmate.saturday}</td>
            <td>${classmate.sunday}</td>
        `;
        tableBody.appendChild(tableRow);
    });
}

function generateSummaryTable() {
    const summaryTable = document.createElement("table");
    summaryTable.innerHTML = `
        <thead>
            <tr>
                <th>Classmate</th>
                <th>Active Days</th>
            </tr>
        </thead>
        <tbody id="summary-table-body">
        </tbody>
    `;
    summaryTableContainer.innerHTML = "";
    summaryTableContainer.appendChild(summaryTable);

    classmates.forEach((classmate) => {
        const activeDays = Object.values(classmate).filter((day) => day === "active").length - 1; // subtract 1 to exclude the name property
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td>${classmate.name}</td>
            <td>${activeDays}</td>
        `;
        document.getElementById("summary-table-body").appendChild(tableRow);
    });
}

const attendanceTable = document.getElementById("attendance-table");
const attendanceTableBody = attendanceTable.getElementsByTagName("tbody")[0];

function updateAttendanceTable() {
    attendanceTableBody.innerHTML = "";
    classmates.forEach((classmate) => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td>${classmate.name}</td>
            ${Object.keys(classmate).slice(1).map((day) => { // skip the name property
                const status = classmate[day] === "active"? "active" : "absent";
                return `<td><button class="edit-status" data-day="${day}" data-status="${status}">${status}</button></td>`;
            }).join("")}
        `;
        attendanceTableBody.appendChild(tableRow);
    });
}

