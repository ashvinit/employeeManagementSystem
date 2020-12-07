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

//function to view employees
async function viewEmployees() {
    //created function to find all employees..function will be defined in orm.js
    const employees = await db.findAllEmployees();
    //list out and show employees in a table
    console.log("\n");
    console.table(employees);
    //load the main prompts for the user to choose from
    loadMainPrompts();
};

//function to view employees by department
async function viewEmployeesByDepartment() {
    const departments = await db.findAllDepartments();

    const departmentChoices = departments.map(({ id, name }) => ({
        //create two properties: name and value for this object
        name: name,
        value: id
    }));

    const { departmentId } = await prompt([
        {
            type: "list",
            name: "departmentId",
            message: "Which department would you like to see employees for?",
            choices: departmentChoices
        }
    ]);

    const employees = await db.findAllEmployeesByDepartment(departmentId);

    console.log("\n");
    console.table(employees);

    loadMainPrompts();
        
};

//function to view employees by manager
async function viewEmployeesByManager() {
    const managers = await db.findAllManagers();

    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
        name: first_name + " " + last_name,
        value: id
    }));

    const { managerId } = await prompt([
        {
            type: "list",
            name: "managerId",
            message: "Which manager would you like to see employees for?",
            choices: managerChoices
        }
    ]);

    const employees = await db.findAllEmployeesByManager(managerId);

    console.log("\n");
    console.table(employees);

    loadMainPrompts();
}

async function updateEmployeeRole() {
    const employees = await db.findAllEmployees();

    const employeeChoices = employees.map(({ id, first_name, last_name}) => ({
        //create two properties: name and value for this object
        name: first_name + " " + last_name,
        value: id
    }));

    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee's role do you want to update?",
            choices: employeeChoices
        }
    ]);

    const roles = await db.findAllRoles();

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt ([
        {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices
        }
    ]);

    await db.updateEmployeeRole(employeeId, roleId);

    console.log("Update employee's role");
    
    loadMainPrompts();
};

//function to view roles
async function viewRoles() {
    const roles = await db.findAllRoles();

    console.log("\n");
    console.table(roles);

    loadMainPrompts();
};

//function to create a new role
async function addRole() {
    const departments = await db.findAllDepartments();

    const departmentChoices = departments.map(({ id, name}) => ({
        name: name,
        value: id
    }));

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

    await db.createRole(role);

    console.log(`Added ${role.title} to the database`);

    loadMainPrompts();
};

//function to view departments
async function viewDepartments() {
    const departments = await db.findAllDepartments();

    console.log("\n");
    console.table(departments);

    loadMainPrompts();
};

//function to add a new department
async function addDepartment() {
    const department = await prompt([
        {
            name: "name",
            message: "What is the name of the department?"
        }
    ]);

    await db.createDepartment(department);

    console.log(`Added ${department.name} to database`);

    loadMainPrompts();
};

async function addEmployee() {
    const roles = await db.findAllRoles();
    const employees = await db.findAllEmployees();

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

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt ({
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices
    });

    employee.role_id = roleId;

    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        //create two properties: anme and value
        name: first_name + " " + last_name,
        value: id
    }));

    managerChoices.unshift({ name: "None", value: null });

    const { managerId } = await prompt ({
        type: "list",
        name: "managerId",
        message: "Who is the employee's manager?",
        choices: managerChoices
    });

    employee.manager_id = managerId;

    await db.createEmployee(employee);

    console.log(
        `Added ${employee.first_name} ${employee.last_name} to the database`
    );

    loadMainPrompts();
};

async function removeEmployee() {
    const employees = await db.findAllEmployees();

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: first_name + " " + last_name,
        value: id
    }));

    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee would you like to remove?",
            choices: employeeChoices
        }
    ])

    employeeChoices.id = employeeId;

    await db.deleteEmployee(employeeId);

    console.log(
        `Employee has been deleted from the database`
    );

    loadMainPrompts();
}

async function removeRole() {
    const roles = await db.findAllRoles();

    const roleChoices = roles.map(({ id, title}) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt ([
        {
            type: "list",
            name: "roleId",
            message: "Which role would you like to remove?",
            choices: roleChoices
        }
    ]);

    roleChoices.id = roleId;

    await db.deleteRole(roleId);

    console.log(
        `Role has been deleted from the database`
    );

    loadMainPrompts();

};

async function removeDepartment () {
    var departments = await db.findAllDepartments();
    
    const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));

    const { departmentId } = await prompt ([
        {
            type: "list",
            name: "departmentId",
            message: "Which department would you like to remove?",
            choices: departmentChoices
        }
    ]);

    departmentChoices.id = departmentId;

    await db.deleteDepartment(departmentId);

    console.log(
        `Department has been successfully removed.`
    );

    loadMainPrompts();
}

function quit() {
    console.log("Goodbye and have a splendid day!");
    process.exit();
};




