const { prompt } = require('inquirer')
const { createConnection } = require('mysql2')
require('console.table')

const db = createConnection('mysql://root:rootroot@localhost/tracker_db')

const init = () => {
  prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['Add Department', 'Add Role', 'Add Employee', 'View Departments', 'View Roles', 'View Employees', 'Update Employees']
    }
  ])
  .then(({action})) => {
    switch (action) {
      case 'Add Department':
        addDepartment()
        break;
      case 'Add Role':
        addRole()
        break;
      case 'Add Employee':
        addEmployee()
        break;
      case 'View Departments':
        viewDepartments()
        break;
      case 'View Roles':
        viewRoles()
        break;
      case 'View Employees':
        viewEmployees()
        break;
      case 'Update Employee':
        updateEmployee()
        break;
    }
  })
}

const addDepartment = () => {
  prompt([
    {
      type: 'input',
      name: 'name',
      message: `Please ENTER New Department's Name:`
    }
  ])
  .then(newDep => {
    db.query(`INSERT INTO departments SET ?`, newDep, err => {
      if(err) {
        console.log(err)
      }
      else {
        console.log(`-----${newDep.name} department has been added-----`) }
        init()
    })
  })
  .catch(err => console.log(err))
}


const viewDepartments = () => {
  db.query('SELECT departments.id, departments.name as department FROM department', (err. departments) => {
    console.table(departments)
  })
}

const viewRoles = () => {
  db.query('SELECT roles.id, role.title, roles.salary, departments.name as department FROM roles LEFT JOIN departments ON roles.department_id = departments.id', (err, roles) => { console.table(roles)})
}

const viewEmployees = () => {
  db.query('SELECT employees.id, CONCAT(employees.first, ' ', employees.last) AS name, roles.title,roles.salary, departments.name AS department, CONCAT(manager.first, ' ', manager.last) AS manager FROM employees LEFT JOIN roles ON employees.roles_id = roles_id LEFT JOIN departments ON roles.department_id = department_id LEFT JOIN employees manager ON manager.id = employees.manager_id', (err, employees) =>
  console.table(employees))
}