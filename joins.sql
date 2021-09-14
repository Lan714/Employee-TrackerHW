USE tracker_db;

SELECT roles.id, roles.title AS subject, roles.salary, departments.name AS department
FROM roles
INNER JOIN departments
ON roles.department_id = department_id;

SELECT roles.id, roles.title AS subject, roles.salary, departments.name AS department
FROM departments
LEFT JOIN roles
ON roles.department_id = department_id
UNION
SELECT roles.id, roles.title AS subject, roles.salary, departments.name AS department
FROM departments
RIGHT JOIN roles
ON roles.department_id = department_id;

USE tracker_db;
SELECT CONCAT(employees.first, ' ', employees.last) AS name,
roles.title,
roles.salary,
departments.name AS department,
CONCAT(manager.first, ' ', manager.last) AS manager
FROM employees
LEFT JOIN roles
ON employees.roles_id = roles_id
LEFT JOIN departments
ON roles.department_id = department_id
LEFT JOIN employees manager
ON manager.id = employees.manager_id;
