//Import MySQL connection
const connection = require("./connection");

class DB {
    //Keeping a refernce to the connection on the class in case we need it later
    constructor(connection) {
        this.connection = connection;
    }

    //Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
    findAllEmployees() {
        //select statement with the following columns from three tables
        //select id, first_name, last_name from employee table and 
        //select department name from department table and 
        //select salary from role table
        //use left joins to join three tables
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name, role.salary FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id;"            
        );
    }

    findAllDepartments() {
        return this.connection.query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department.name"
        )
    }

    findAllEmployeesByDepartment(departmentId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = ?;",
            departmentId
        );
    }

    findAllRoles() {
        return this.connection.query(
            //select the following columns:
            //id, title, salary from role table
            //name from department table
            //left join to join role and department tables
            "SELECT role.id, role.title, role.salary, department.name FROM role LEFT JOIN department ON department.id = role.department_id;"
        )
    }

    updateEmployeeRole(employeeId, roleId) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }

    createRole(role) {
        return this.connection.query(
            "INSERT INTO role SET ?",
            role
        );
    };
    
}

module.exports = new DB(connection);