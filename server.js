

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
    const sql = `SELECT role.title AS Job Title, role.id, role.salary AS Salary
                FROM role
                JOIN department ON department.name = department.id;`
    db.query(sql, (err, rows) => {
        if(err) throw err;
        console.table(res);
    })
}

//view all emloyees

//add department

//add a role

//add an empolyee

//update employee roll