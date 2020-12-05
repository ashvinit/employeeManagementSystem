use employeeTracker_db;


-- DEPARTMENT --
INSERT INTO department 
    (name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');


--ROLE--
INSERT INTO role 
    (title, salary, department_id) 
VALUES
    ('Customer Service Rep', 26000, 1),
    ('Customer Service Manager', 95000, 1),
    ('Software Engineer', 93000, 2),
    ('Lead Engineer', 140000, 2),
    ('Accountant', 125000, 3),
    ('Bookkeeper', 45000, 3),
    ('Paralegal', 56000, 4),
    ('Lawyer', 120000, 4);


--EMPLOYEE--
INSERT INTO employee 
    (first_name, last_name, role_id, manager_id) 
VALUES 
    ('Michael', 'Scott', 2, NULL),
    ('Dwight', 'Schrute', 1, 1),
    ('Pam', 'Beasley', 3, NULL),
    ('Jim', 'Halpert', 4, 3),
    ('Angela', 'Martin', 5, NULL),
    ('Andy', 'Bernard', 6, 5),
    ('Ryan', 'Howard', 8, NULL),
    ('Kelly', 'Kapoor', 7, 7);


