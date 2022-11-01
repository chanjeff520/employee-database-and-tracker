

const mysql = require("mysql2");

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
    db.query(sql, (err, rows) => {
        if(err) throw err;
        console.table(res);
    })
}

//view all emloyees
function viewAllEmployees(){
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS Job Title, department.name As Department Name, role.salary, CONCAT(e.first_name, ' ', e.last_name) AS Manager
                FROM employee
                INNER JOIN role on role.id = employee.role_id
                INNER JOIN `
}
//add department

//add a role

//add an empolyee

//update employee roll