
const inquirer = require("inquirer");
const { default: Choices } = require("inquirer/lib/objects/choices");
const mysql = require("mysql2");
const { last } = require("rxjs");

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
                "Add Employee"
            ]
        }
    ]).then((res) => {
        switch (val.choice){
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
function addRole(title, salary, departmentId){
    const values = title + ", " + salary +", " + departmentId;
    const sql = 'INSERT INTO role(title, salary, department_id) VALUES (?);';
    db.query(sql, values, (err,res) => {
        if (err){
            console.log("New Department was not added.")
            throw err;
        }
        console.log("New Role has been added.");
    });
}

//add an empolyee
function addEmployee(firstName, LastName, roleId, departmentId){

    inquirer.prompt([
        {
            type: "",
        }
    ])

    const values = firstName + ", " + LastName + ", " + roleId + ", " + departmentId;
    const sql = 'INSERT INTO employee(first_name , last_name, role_id, department_id) VALUES (?);';
    db.query(sql, values, (err,res) => {
        if (err){
            console.log("New Department was not added.")
            throw err;
        }
        console.log("New employee has been added.");
    });
}

//update employee role'
function updateEmployee(){
    const sql = 'SELECT * FROM employee';
    
    db.query(sql, (err,res) => {
        console.log(res);
        const employeeArr = res.map((employee) => {
            return {
                name: employee.first_name + " " +employee.last_name,
                value: employee.id
            }
        });
        console.log(employeeArr);
    })

    //list provide list of employee to user if hte user select one,
    //we can get the employeeid
    //make a list of the role and show the list to hte user,
    //user can select a role, then we know about the employe id and role id
    //update using employee id and role.id

    // inquirer.prompt([
    //     {
    //         type: "list",

    //     }
    // ])

}



function intro(){
    console.log(`
    
    
    
    
    `)
}

updateEmployee();