//Import MySQL connection
const connection = require("./connection");

class DB {
    //Keeping a refernce to the connection on the class in case we need it later
    constructor(connection) {
        this.connection = connection;
    }

    //Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
    findAllEmployees() {
        return this.connection.query();
    }
}

module.exports = new DB(connection);