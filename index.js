const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "#sql#sql",
    database: "studentdetails"

})

connection.connect((err)=>{
    if(err){
        console.error('Error connecting to mysql database:',err);
    }
    console.log('connected to mysql database');
})
connection.query(`
    CREATE TABLE IF NOT EXISTS students (
      studentid INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      batch INT NOT NULL,
      gender ENUM('Male', 'Female', 'Other') NOT NULL,
      department VARCHAR(255) NOT NULL,
      phone VARCHAR(15) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE
    )
  `, (err, results, fields) => {
    if (err) {
      console.error('Error creating students table:', err);
      return;
    }
    console.log('Students table created successfully');
  });

  connection.query(`
  CREATE TABLE IF NOT EXISTS result (
   
    studentid INT NOT NULL,
    semester INT NOT NULL,
    cgpa DECIMAL(4, 2) NOT NULL,
    FOREIGN KEY (studentid) REFERENCES students(studentid)
  )
`, (err, results, fields) => {
  if (err) {
    console.error('Error creating result table:', err);
    return;
  }
  console.log('Result table created successfully');
});



connection.query(`
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
  
);

`, (err, results, fields) => {
    if (err) {
        console.error('Error creating user table:', err);
        return;
    }
    console.log('User table created successfully');
});





process.on('SIGINT', () => {
    connection.end();
    console.log('MySQL connection closed');
  });

  module.exports = connection;
