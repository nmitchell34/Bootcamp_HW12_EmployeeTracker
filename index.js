const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
var orm = require("./orm.js");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "NM97c13ab0!",
  database: "cms_db",
});
let rolesArr = [];
let departmentArr = [];

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
function init() {
  connection.query("SELECT department FROM departments", function (err, res) {
    // console.log(res)
    for (i = 0; i < res.length; i++) {
      // console.log(res[i].department)
      departmentArr.push(res[i].department);
    }
  });
  connection.query("SELECT title FROM roles", function (err, res) {
    // console.log(res)
    for (i = 0; i < res.length; i++) {
      rolesArr.push(res[i].title);
    }
  });
  inquirer
    .prompt({
      name: "promptStart",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees by Department",
        "View All Employees by Role",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Remove Employee",
        "Remove Role",
        "Remove Department",
        "Update Employee Name",
        "Update Employee Role",
        "Update Employee Department",
      ],
    })
    .then(function (answers) {
      console.log(answers);
      switch (answers.promptStart) {
        case "View All Employees":
          connection.query(
            "SELECT employees.employee_id, employees.first_name, employees.last_name, departments.department, roles.title, roles.salary FROM employees INNER JOIN departments ON employees.department_id=departments.department_id INNER JOIN roles ON employees.role_id=roles.role_id",
            function (err, data) {
              if (err) throw err;
              console.table(data);
              init();
            }
          );
          break;
        case "View All Employees by Department":
          byDeptOrRole("department", "departments", "Department");
          break;
        case "View All Employees by Role":
          byDeptOrRole("title", "roles", "Role");
          break;
        case "Add Employee":
          addItem("employees");
          break;
        case "Add Role":
          addItem("roles");
          break;
        case "Add Department":
          addItem("departments");
          break;
        case "Remove Employee":
          break;
        case "Remove Role":
          break;
        case "Remove Department":
          break;
        case "Update Employee Name":
          break;
        case "Update Employee Role":
          break;
        case "Update Employee Department":
          break;
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
}

// function viewEmployees() {}

// Queries List
// connection.query(
//   "SELECT employees.employee_id, employees.first_name, employees.last_name, roles.title, roles.salary FROM employees INNER JOIN roles ON employees.roles.id=roles.roles.id",
//   function (err, data) {
//     if (err) throw err;
//     console.table(data);
//   }
// );

// Initiation Function
init();

function byDeptOrRole(col, table, deptOrRole) {
  connection.query("SELECT ?? FROM ??", [col, table], function (err, data) {
    if (err) throw err;
    choicesArr = [];
    if (col === "department") {
      for (i = 0; i < data.length; i++) {
        choicesArr.push(data[i].department);
      }
    } else {
      for (i = 0; i < data.length; i++) {
        choicesArr.push(data[i].title);
      }
    }
    inquirer
      .prompt({
        name: "deptRoleSelection",
        message: "Which " + deptOrRole + " would you like to see?",
        type: "list",
        choices: choicesArr,
      })
      .then((answers) => {
        connection.query(
          "SELECT employees.employee_id, employees.first_name, employees.last_name, departments.department, roles.title, roles.salary FROM employees INNER JOIN departments ON employees.department_id=departments.department_id INNER JOIN roles ON employees.role_id=roles.role_id WHERE ??.?? = ?",
          [table, col, answers.deptRoleSelection],
          function (err, data) {
            if (err) throw err;
            console.table(data);
            init();
          }
        );
        // answers.deptRoleSelection
      });
  });
}

function addItem(selection) {
  switch (selection) {
    case "employees":
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "Please input the Employee's First Name",
          },
          {
            type: "input",
            name: "last_name",
            message: "Please input the Employee's Last Name",
          },
          {
            type: "list",
            name: "title",
            message: "Please input the Employee's Title",
            choices: rolesArr,
          },
          {
            type: "list",
            name: "department",
            message: "Please input the Employee's Title",
            choices: departmentArr,
          },
        ])
        .then(function (answers) {
          console.log(answers);
          connection.query(
            "INSERT INTO employees(first_name, last_name, role_id, department_id) VALUES (?)",
            [
              answers.first_name,
              answers.last_name,
              "(SELECT role_id FROM roles WHERE role=" + answers.title + ")",
              "(SELECT department_id FROM departments WHERE department=" +
                answers.title +
                ")",
            ],
            function (err, data) {
              if (err) throw err;
              console.log("Employee Added!");
              init();
            }
          );
        });
      break;
    case "roles":
      break;
    case "departments":
      break;
  }
}
