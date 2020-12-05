--DEPARTMENT--
INSERT INTO department (name) VALUES ('Sales');

INSERT INTO department (name) VALUES ('Engineering');

INSERT INTO department (name) VALUES ('Finance');

INSERT INTO department (name) VALUES ('Legal');


--ROLE--
INSERT INTO role (title, salary, department_id) VALUES ('Customer Service Rep', 26000, 1);

INSERT INTO role (title, salary, department_id) VALUES ('Customer Service Manager', 95000, 1);

INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 93000, 2);

INSERT INTO role (title, salary, department_id) VALUES ('Lead Engineer', 140000, 2);

INSERT INTO role (title, salary, department_id) VALUES ('Accountant', 125000, 3);

INSERT INTO role (title, salary, department_id) VALUES ('Bookkeeper', 45000, 3);

INSERT INTO role (title, salary, department_id) VALUES ('Paralegal', 56000, 4);

INSERT INTO role (title, salary, department_id) VALUES ('Lawyer', 120000, 4);


--EMPLOYEE--
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Michael', 'Scott', 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Dwight', 'Schrute', 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Pam', 'Beasley', 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jim', 'Halpert', 4, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Angela', 'Martin', 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Andy', 'Bernard', 6, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Ryan', 'Howard', 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Kelly', 'Kapoor', 7, 7);


