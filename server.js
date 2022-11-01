

const mysql = require("mysql2");
const { last } = require("rxjs");

const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3001,
        user: 'root',
        password: 'password',
        database: 'employees_db'
    },
    console.log('Connected to the employees_db database')
);

//view all departments
function viewAllDepartments(){
    const sql = `SELECT * FROM departments;`;
    db.query(sql, (err, rows) => {
        if(err) throw err;
        console.table(res);
    })
}

//view all roles
function viewAllRoles(){
    const sql = `SELECT role.title AS Job Title, role.id, department.name AS Department Name, role.salary AS Salary
                FROM role
                JOIN department ON role.department = department.id;`
    db.query(sql, (err, res) => {
        if(err) throw err;
        console.table(res);
    })
}

//view all emloyees
function viewAllEmployees(){
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS Job Title, department.name As Department Name, role.salary, CONCAT(e.first_name, ' ', e.last_name) AS Manager
                FROM employee
                INNER JOIN role on role.id = employee.role_id
                INNER JOIN department on department.id = role.department_id
                LEFT JOIN employee e on employee.manager_id = e.id;`;
    db.query(sql, (err,res) =>{
        if(err) throw err;
        console.table(res);
    });
};
//add department
function addDepartment(newDepartment){
    const sql = 'INSERT INTO department(name) VALUES (?)';
    db.query(sql, newDepartment, (err,res) => {
        if (err){
            console.log("New Department was not added.")
            throw err;
        }
        console.log("New department have been added.");
    })
}

//add a role
function addRole(title, salary, departmentId){
    const values = title + ", " + salary +", " + departmentId;
    const sql = 'INSERT INTO role(title, salary, department) VALUES (?);';
    db.query(sql, values, (err,res) => {
        if (err){
            console.log("New Department was not added.")
            throw err;
        }
        console.log("New Role has been added.");
    })
}

//add an empolyee
function addEmployeee(firstName, LastName, roleId, departmentId){
    const values = firstName + ", " + LastName + ", " + roleId + ", " + departmentId;
    const sql = 'INSERT INTO employee(first_name , last_name, role, department) VALUES (?);';
    db.query(sql, values, (err,res) => {
        if (err){
            console.log("New Department was not added.")
            throw err;
        }
        console.log("New employee has been added.");
    });
}

//update employee roll'

function intro(){
    console.log(`
    
    
    
    
    `)
}