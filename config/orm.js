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
}

module.exports = new DB(connection);