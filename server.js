//packages required
const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./config/orm");
require("console.table");

init ();

//display logo text, load main prompts
function init() {
    const logoText = logo({ name: "Employee Management System" }).render();

    console.log(logoText);

    loadMainPrompts();
};

//main prompts
async function loadMainPrompts() {
    const { choice } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Employees By Department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                },
                {
                    name: "View All Employees By Manager",
                    value: "VIEW_EMPLOYEES_BY_MANAGER"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Remove Employee",
                    value: "REMOVE_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Update Employee Manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Remove Role",
                    value: "REMOVE_ROLE"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Remove Department",
                    value: "REMOVE_DEPARTMENT"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ]);

    //call the appropriate function depending on what the user chose
    switch (choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
            return viewEmployeesByDepartment();
        case "VIEW_EMPLOYEES_BY_MANAGER":
            return viewEmployeesByManager();
        case "ADD_EMPLOYEE":
            return addEmployee();
        case "REMOVE_EMPLOYEE":
            return removeEmployee();
        case "UPDATE_EMPLOYEE_ROLE":
            return updateEmployeeRole();
        case "UPDATE_EMPLOYEE_MANAGER":
            return updateEmployeeManager();
        case "VIEW_ROLES":
            return viewRoles();
        case "ADD_ROLE":
            return addRole();
        case "REMOVE_ROLE":
            return removeRole();
        case "VIEW_DEPARTMENTS":
            return viewDepartments();
        case "ADD_DEPARTMENT":
            return addDepartment();
        case "REMOVE_DEPARTMENT":
            return removeDepartment();
        case "QUIT":
            return quit();
    };
};


// VIEW EMPLOYEES
async function viewEmployees() {
    //created function to find all employees..function will be defined in orm.js
    const employees = await db.findAllEmployees();
    //list out and show employees in a table
    console.log("\n");
    console.table(employees);
    //load the main prompts for the user to choose from
    loadMainPrompts();
};


// VIEW EMPLOYEES BY DEPARTMENT
async function viewEmployeesByDepartment() {
    //find all the departments and list them out
    const departments = await db.findAllDepartments();
    //the object for each department will return to map() to construct an array to be returned and stored to departmentChoices
    const departmentChoices = departments.map(({ id, name }) => ({
        //create two properties: name and value for this object
        name: name,
        value: id
    }));
    //prompt for user to choose which department they would like to view
    const { departmentId } = await prompt([
        {
            type: "list",
            name: "departmentId",
            message: "Which department would you like to see employees for?",
            choices: departmentChoices
        }
    ]);
    //call function to find all employees by deparment with the id of the department the user choice passed into the function
    const employees = await db.findAllEmployeesByDepartment(departmentId);
    //show all the employees in the department in a table
    console.log("\n");
    console.table(employees);
    //load main prompts
    loadMainPrompts();
        
};


// VIEW EMPLOYEES BY MANAGER
async function viewEmployeesByManager() {
    //run function to find all managers
    const managers = await db.findAllManagers();
    //return the full name of the manager and return to map() to construct array
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
        name: first_name + " " + last_name,
        value: id
    }));
    //prompt to choose manager and store the id in managerId
    const { managerId } = await prompt([
        {
            type: "list",
            name: "managerId",
            message: "Which manager would you like to see employees for?",
            choices: managerChoices
        }
    ]);
    //calling function to find all employees by manager by using the manager id
    const employees = await db.findAllEmployeesByManager(managerId);
    //display table with employees for a manager chosen
    console.log("\n");
    console.table(employees);
    //laod main prompts
    loadMainPrompts();
};


// UPDATE EMPLOYEE ROLE
async function updateEmployeeRole() {
    //find all the employees and store it into employees
    const employees = await db.findAllEmployees();
    //show the full names to select from and return to map() to construct array
    const employeeChoices = employees.map(({ id, first_name, last_name}) => ({
        //create two properties: name and value for this object
        name: first_name + " " + last_name,
        value: id
    }));
    //ask user for which which employee they want to update and store answer in employeeId
    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee's role do you want to update?",
            choices: employeeChoices
        }
    ]);
    //funtion to retrieve all roles and store it into roles
    const roles = await db.findAllRoles();
    //list out roles and return to map() to construct array
    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));
    //ask user which role they want to choose for the employee and store it into roleId
    const { roleId } = await prompt ([
        {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices
        }
    ]);
    //call function to update the role using the employeeId and roleId
    await db.updateEmployeeRole(employeeId, roleId);
    //update success
    console.log("Update employee's role");
    //load main prompts
    loadMainPrompts();
};


// VIEW ROLES
async function viewRoles() {
    //show all roles
    const roles = await db.findAllRoles();
    //show roles in a list
    console.log("\n");
    console.table(roles);
    //load main prompts
    loadMainPrompts();
};


// ADD NEW ROLE
async function addRole() {
    //find all departments and store it in departments
    const departments = await db.findAllDepartments();
    //list all the names and id of the departments and return it to map() to construct an array
    const departmentChoices = departments.map(({ id, name}) => ({
        name: name,
        value: id
    }));
    //ask user appropriate questions for role to create columns in the role table
    const role = await prompt([
        {
            name: "title",
            message: "What is the name of the role?"
        },
        {
            name: "salary",
            value: "What is the salary of the role?"
        },
        {
            type: "list",
            name: "department_id",
            message: "Which department does the role belong to?",
            choices: departmentChoices
        }
    ]);
    //call function to create role
    await db.createRole(role);
    //success
    console.log(`Added ${role.title} to the database`);
    //load main prompts
    loadMainPrompts();
};


// VIEW DEPARTMENTS
async function viewDepartments() {
    //find all departments
    const departments = await db.findAllDepartments();
    //show in a table
    console.log("\n");
    console.table(departments);
    //load main prompts
    loadMainPrompts();
};


// ADD NEW DEPARTMENT
async function addDepartment() {
    //ask user for the name of the department
    const department = await prompt([
        {
            name: "name",
            message: "What is the name of the department?"
        }
    ]);
    //function to create department in database using user input
    await db.createDepartment(department);
    //success
    console.log(`Added ${department.name} to database`);
    //load main prompts
    loadMainPrompts();
};


// ADD EMPLOYEE
async function addEmployee() {
    // find roles and employees
    const roles = await db.findAllRoles();
    const employees = await db.findAllEmployees();
    //ask user for first adn last name
    const employee = await prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the employee's last name?"
        }
    ]);
    //list out roles
    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));
    //prompt user to chose role
    const { roleId } = await prompt ({
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices
    });
    //store role id
    employee.role_id = roleId;
    //list out managers
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        //create two properties: anme and value
        name: first_name + " " + last_name,
        value: id
    }));
    //incase employee is the manager
    managerChoices.unshift({ name: "None", value: null });
    //prompt user to chose manager
    const { managerId } = await prompt ({
        type: "list",
        name: "managerId",
        message: "Who is the employee's manager?",
        choices: managerChoices
    });
    //store managerid
    employee.manager_id = managerId;
    //function to create new employee in db
    await db.createEmployee(employee);
    //success
    console.log(
        `Added ${employee.first_name} ${employee.last_name} to the database`
    );
    //load main prompts
    loadMainPrompts();
};


// REMOVE EMPLOYEE
async function removeEmployee() {
    //find all employee function
    const employees = await db.findAllEmployees();
    //retrieve employee choices by full name
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: first_name + " " + last_name,
        value: id
    }));
    //prompt user to choose the employee
    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee would you like to remove?",
            choices: employeeChoices
        }
    ]);
    //store employee id
    employeeChoices.id = employeeId;
    //call function to delete employee using the id
    await db.deleteEmployee(employeeId);
    //success
    console.log(
        `Employee has been deleted from the database`
    );
    //load main prompts
    loadMainPrompts();
};


// REMOVE ROLE
async function removeRole() {
    //function to find all roles
    const roles = await db.findAllRoles();
    //retrieve choices
    const roleChoices = roles.map(({ id, title}) => ({
        name: title,
        value: id
    }));
    //prompt user to choose the role
    const { roleId } = await prompt ([
        {
            type: "list",
            name: "roleId",
            message: "Which role would you like to remove?",
            choices: roleChoices
        }
    ]);
    //store the role id that the user chose
    roleChoices.id = roleId;
    //call function to delete the role using the id
    await db.deleteRole(roleId);
    //success
    console.log(
        `Role has been deleted from the database`
    );
    //load main prompts
    loadMainPrompts();
};


// REMOVE DEPARTMENT
async function removeDepartment () {
    //find all departments
    var departments = await db.findAllDepartments();
    //retrieve choices
    const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));
    //prompt user to choose the department
    const { departmentId } = await prompt ([
        {
            type: "list",
            name: "departmentId",
            message: "Which department would you like to remove?",
            choices: departmentChoices
        }
    ]);
    //get the department id
    departmentChoices.id = departmentId;
    //call function to delete department using the id
    await db.deleteDepartment(departmentId);
    //success
    console.log(
        `Department has been successfully removed.`
    );
    //load main prompts
    loadMainPrompts();
};


// QUIT
function quit() {
    console.log("Goodbye and have a splendid day!");
    process.exit();
};




