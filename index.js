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

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
function init() {
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
            inquirer.prompt({
                
            })
          break;
        case "View All Employees by Role":
          break;
        case "Add Employee":
          break;
        case "Add Role":
          break;
        case "Add Department":
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

function viewEmployees() {}

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
