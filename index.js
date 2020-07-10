const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
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
  inquirer.prompt({
    name: "promptStart",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Employees by Department",
      "View All Employees by Role",
      "Add Employee",
      "Remove Employee",
      "Update Employee Role",
      "Update Employee Department",
    ],
  });
}

// Queries List

init()