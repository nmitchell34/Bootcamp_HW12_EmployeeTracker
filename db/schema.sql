DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;

USE cms_db;

CREATE TABLE employees
(
	employee_id int NOT NULL AUTO_INCREMENT,
	first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id INT,
    manager_id INT,
	PRIMARY KEY (employee_id)
);

CREATE TABLE departments
(
	department_id int NOT NULL AUTO_INCREMENT,
	name varchar(30) NOT NULL,
	PRIMARY KEY (department_id)
);
CREATE TABLE roles
(
    role_id int NOT NULL AUTO_INCREMENT,
    title varchar(30) NOT NULL,
    salary DECIMAL(10,4),
    department_id INT,
    PRIMARY KEY (role_id),
    FOREIGN KEY (department_id) REFERENCES department(department_id)
)