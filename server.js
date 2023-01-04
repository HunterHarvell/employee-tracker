const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// creating a connection to the database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      // MySQL password
      password: '',
      database: 'employeeTracker_db'
    },
    console.log('Successfully connected to employee database.')
  );

//initial prompt plus decision tree
const initialQuestion = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "selection",
            message: "What would you like to do?",
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
            validate: selectionInput => {
                if (selectionInput) {
                    return true;
                } else {
                    console.log('Please select an action.');
                    return false;
                }
            }
        }
    ])
    .then ((initialAnswer) => {
        switch(initialAnswer.selection) {
            case 'view all departments':
                viewDepartments();
                break;
            case 'view all roles':
                viewRoles();
                break;
            case 'view all employees':
                viewEmployees();
                break;
            case 'add a department':
                addDepartment();
                break;
            case 'add a role':
                addRole();
                break;
            case 'add an employee':
                addEmployee();
            break;
            case 'update an employee role':
                updateEmployeeRole();
            break;
            default: 
            initialQuestion();
        }
    })
};

const viewDepartments = () => {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) {
            console.error(err);
        }
        console.log('\n');
        console.table(res);
        initialQuestion();
    });
}

const viewRoles = () => {
    db.query('SELECT * FROM roles', (err, res) => {
        if(err) {
            console.error(err);
        }
        console.log('\n');
        console.table(res);
        initialQuestion();
    });
}

const viewEmployees = () => {
    db.query('SELECT * FROM employee', (err, res) => {
        if(err) {
            console.error(err);
        }
        console.log('\n');
        console.table(res);
        initialQuestion();
    });
}

const addDepartment = () => {
    inquirer.prompt({
        type: 'input',
        name: 'addDepartment',
        message: 'What is the name of the department?'
    }).then((answer) => {
        db.query('INSERT INTO department (name) VALUES (?)', answer.addDepartment, (err, res) => {
            if(err) {
                console.error(err);
            }
            console.log('\n');
            console.log('\nAdded Department to Database');
            initialQuestion();
        });
    });
}

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What role would you like to add?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this role?'
        }
    ]).then((role) => {
        db.query('SELECT name, id FROM department', (err, res) => {
            if (err) {
                console.error(err);
            }
            inquirer.prompt({
                type: 'list',
                name: 'department',
                message: 'Which department does the role belong to?',
                choices: res.map((department) => department.name)
            }).then((answer) => {
                const departmentID = res.filter((data) => data.name === answer.department)[0].id;
                console.log(departmentID);
                db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [role.name, role.salary, departmentID], (err, res) => {
                    console.log(res);
                    if (err) {
                        console.error(err);
                    }
                    console.log('\n');
                    console.table(res);
                    console.log('Added role to database');
                    initialQuestion();
                });
            });
        });
    });
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'last',
            message: 'What is the last name of the employee?'
        },
    ]).then((nameAnswer) => {
        const {first, last} = nameAnswer;
        db.query('SELECT title, id FROM role', (err,roleRes) => {
            if (err) {
                console.error(err);
            }
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is this employees role?',
                    choices: roleRes.map((role) => role.title)
                }
            ]).then((roleAnswer) => {
                const {role} = roleAnswer;
                const roleArray = roleRes.filter((data) => data.title === role);
                const roleId = roleArray[0].id;
                db.query('SELECT first_name, last_name, id FROM employee', (err,employeeRes) => {
                    if (err) {
                        console.error(err);
                    }
                    inquirer.prompt({
                        type: 'list',
                        name: 'manager',
                        message: 'What manager is responsible for this employee?',
                        choices: employeeRes.map((role) => `${role.first_name} ${role.last_name}`)
                    }).then((managerAnswer) => {
                        const {manager} = managerAnswer;
                        const managerId = employeeRes.filter((data) => `${data.first_name} ${data.last_name}` === manager)[0].id;
                        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first, last, roleId, managerId], (err,res) => { 
                            if (err) {
                            console.error(err);
                            }
                            console.log('\n');
                            console.log('Added employee to database');
                            initialQuestion();
                        });
                    });
                });
            });
        });
    });
}

const updateEmployee = () => {
    db.query('SELECT first_name, last_name, id FROM employee', (err,selectedEmployee) => {
        if (err) {
            console.error(err);
        }
        inquirer.prompt({
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to update?',
            choices: selectedEmployee.map((employee) => `${employee.id} ${employee.first_name} ${employee.last_name}`)
        }).then((empAnswer) => {
            const {employee} = empAnswer;
            const empId = employee.split(' ')[0];
            db.query('SELECT title, id FROM role', (err,roles) => {
                if (err) {
                    console.error(err);
                }
                inquirer.prompt({
                    type: 'list',
                    name: 'roleUpdate',
                    message: 'What role does the employee have?',
                    choices: roles.map((role) => role.title)
                }).then((roleAnswer) => {
                    const {roleUpdate} = roleAnswer;
                    const roleIndex = roles.map((role) => role.title).indexOf(roleUpdate);
                    const roleId = roles[roleIndex].id;
                    db.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, empId], (err,res) => {
                        if(err) {
                            console.error(err);
                        }
                        console.log('\n');
                        console.log('Employee successfully updated!');
                        initialQuestion();
                    });
                });
            });
        });
    }); 
}

initialQuestion();

