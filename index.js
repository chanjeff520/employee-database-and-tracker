
const inquirer = require("inquirer");
const mysql = require("mysql2");

//connection to mysql
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employees_db'
    },
    console.log('Connected to the employees_db database')
);

function initalPrompt(){
    inquirer.prompt([
        {
            type: "list",
            message: "Select your choice",
            name: "choice",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Role"
            ]
        }
    ]).then((res) => {
        switch (res.choice){
            case "View All Departments": viewAllDepartments();
                break;

            case "View All Roles": viewAllRoles();
                break;

            case "View All Employees": viewAllEmployees();
                break;

            case "Add Department": addDepartment();
                break;

            case "Add Role": addRole();
                break;

            case "Add Employee": addEmployee();
                break;

            case "Update Employee Role": updateEmployee();
                break;
        }
    });
}

//view all departments
function viewAllDepartments(){
    const sql = `SELECT * FROM department;`;
    db.query(sql, (err, res) => {
        if(err) throw err;
        console.table(res);
        initalPrompt();
    });
}

//view all roles
function viewAllRoles(){
    const sql = `SELECT role.title, role.id, department.name AS department, role.salary
                FROM role
                JOIN department ON role.department_id = department.id;`
    db.query(sql, (err, res) => {
        if(err) throw err;
        console.table(res);
        initalPrompt();
    });

}

//view all emloyees
function viewAllEmployees(){
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS Job_Title, department.name As Department_Name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id
                ;`;
    db.query(sql, (err,res) =>{
        if(err) throw err;
        console.table(res);
        initalPrompt();
    });
};

//add department
function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            message: "Input a new Department",
            name: "newDepartment",
        }
    ]).then( (res) => {
        const sql = 'INSERT INTO department(name) VALUES (?)';
        db.query(sql, res.newDepartment, (err,res) => {
        if (err){
            console.log("New Department was not added.")
            throw err;
        }
        console.log("New department have been added.");
        initalPrompt();
        });
    });

}

//add a role
function addRole(){
    inquirer.prompt([
        {
            type: "input",
            message: "Input the title of the new Role",
            name: "title"
        },
        {
            type: "input",
            message: "Input the salary of the new Role",
            name: "salary"
        },
        {
            type: "input",
            message: "Input the DepartmentID of the role",
            name: "departmentId"
        }
    ])
    .then( (res) => {
        const sql = `INSERT INTO role(title, salary, department_id) VALUES ("${res.title}", ${res.salary}, ${res.departmentId});`;
        db.query(sql, (err,res) => {
        if (err){
            console.log("New Role was not added.")
            throw err;
        }
        console.log("New Role has been added.");
        initalPrompt();
        });
    });

}

//add an empolyee
function addEmployee(){

    inquirer.prompt([
        {
            type: "input",
            message: "Input the first name of the new employee",
            name: "firstName"
        },
        {
            type: "input",
            message: "Input the last name of the new employee",
            name: "lastName"
        },
        {
            type: "input",
            message: "Input the roleID of the employee",
            name: "roleId"
        },
        {
            type: "input",
            message: "Input the Manager of the employee. If none put 'NULL'.",
            name: "managerId"
        }
    ])
    .then((res) => {
        const sql =`INSERT INTO employee(first_name , last_name, role_id, manager_id) VALUES ("${res.firstName}","${res.lastName}", ${res.roleId}, ${res.managerId});`;
        db.query(sql, (err,res) => {
            if (err){
                console.log("New employee was not added.")
                throw err;
            }
        console.log("New employee has been added.");
        initalPrompt();
        });
    });
}

//update employee role'
async function updateEmployee(){

    //for the employees
    let selectedEmployee;
    const sql = `SELECT * FROM employee`
    let employeeList = [];
    db.query(sql, (err,res) => {
        employeeList = res.map((employee) => {
            return {
                name: employee.first_name + " " +employee.last_name,
                id: employee.id,
            }
        });

        selectedEmployee = inquirer.prompt(
            //question 1: Which employee?
            {
                type: "list",
                name: "employeeName",
                message: "Which employee do you want to his/her role to change to?",
                choices: employeeList
            }
        );
    })

    //for the roles
    let selectedRole;
    let roleList = []
    db.query('SELECT * FROM role', (err, res) => {
        roleList = res.map((role) => {
            return {
                title: role.title,
                id: role.id
            }
        });

        selectedRole = inquirer.prompt(
            //question 2: What role?
            {
                type: "list",
                name: "role",
                message: "What Role do you want to change the new Employee to?",
                choices: roleList
            },
        ).id
        console.log(selectedRole)
    });

}

initalPrompt();