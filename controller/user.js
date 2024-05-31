const { check, validationResult } = require('express-validator');
const connection = require('../index');
const { ARRAY } = require('sequelize');
const validateStudent = [
    check('name').notEmpty().withMessage('Name is required'),
    check('batch').notEmpty().withMessage('Batch is required'),
    check('gender').notEmpty().withMessage('Gender is required'),
    check('department').notEmpty().withMessage('Department is required'),
    check('phone').isMobilePhone().withMessage('Invalid phone number'),
    check('email').isEmail().withMessage('Invalid email address')
];

async function create(req, res, next) {
    const errors = validationResult(req);
   
  
    if (!errors.isEmpty()) {

        const errorMessages = errors.array().map(error => error.msg);
         
        return res.status(400).json({ errors: errorMessages });
    }

    const { name, batch, gender, department, phone, email } = req.body;

    const sql = 'INSERT INTO students (name, batch, gender, department, phone, email) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [name, batch, gender, department, phone, email];

    connection.query(sql, values, (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                console.error('Duplicate entry error:', err);
                return res.status(400).json({ error: 'Duplicate entry for email' });
            } else {
                console.error('Error inserting user data:', err);
                return res.status(500).json({ error: 'Error inserting user data' });
            }
        }
        console.log('User data inserted successfully');
        return res.status(200).json({ message: 'User data inserted successfully' });
    });
}

async function getAllStudents(req, res, next) {


    const sql = 'SELECT * FROM students ';
    

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching students data:', err);
            return res.status(500).json({ error: 'Error fetching students data' });
        }

       
        return res.status(200).json(results);
    });
}



async function Delete(req, res, next) {
    let studentid = req.params.id; 

    connection.query('DELETE FROM students WHERE studentid = ?', studentid, (err, result) => {
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).json({ error: 'Error deleting user' });
        }

        if (result.affectedRows === 0) {
            console.error("User not found");
            return res.status(500).json({ error: 'User not found' });
        }

        console.log("Successfully deleted user");
        return res.status(200).json({ message: "Successfully deleted user" });
    });
}

async function updateUser(req, res, next) {
    const { name, batch, gender, department, phone, email } = req.body;
    const studentid = req.params.id; 

    const sql = 'UPDATE students SET name=?, batch=?, gender=?, department=?, phone=?, email=? WHERE studentid=?';
    const values = [name, batch, gender, department, phone, email, studentid];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating student data:', err);
            return res.status(500).json({ error: 'Error updating student data' });
        }

        if (result.affectedRows === 0) {
            console.error('Student not found');
            return res.status(404).json({ error: 'Student not found' });
        }

        console.log('Student data updated successfully');
        return res.status(200).json({ message: 'Student data updated successfully' });
    });
}


async function getstudent(req, res, next) {
    const studentId = req.params.id; 
    const sql = 'SELECT * FROM students WHERE studentid = ?';
    const values = [studentId]; 

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching student data:', err);
            return res.status(500).json({ error: 'Error fetching student data' });
        }

        
        if (results.length === 0) {
            console.error('Student not found');
            return res.status(404).json({ error: 'Student not found' });
        }

        
        return res.status(200).json(results[0]); 
    });
}

async function serachdata(){

  let searchitem = req.query.searchitem;
  
  

}

module.exports = {
    create,
    validateStudent,
    getAllStudents,
    Delete,
    updateUser,
    getstudent,
    serachdata,
    
};
