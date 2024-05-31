// const connection = require('../index');
// const jwt = require('jsonwebtoken');
// const generateOtp = require('otp-generator');

// async function create(req, res, next) {
//     const { username, password } = req.body;

//     const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
//     const values = [username, password];

//     connection.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error inserting user data:', err);
//             return res.status(500).json({ error: 'Error inserting user data' });
//         }
//         console.log('User data inserted successfully');
//         return res.status(200).json({ message: 'User data inserted successfully' });
//     });
// }

// async function login(req, res, next) {
//     const { username, password } = req.body;
//     const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
//     const values = [username, password];

//     connection.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error executing login query:', err);
//             return res.status(500).json({ error: 'Error executing login query' });
//         }

//         if (result.length === 0) {
//             return res.status(401).json({ error: 'Invalid username or password' });
//         }

//         const user = result[0];
//         const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });

//         res.json({ success: true, token, message: 'Login successful' });
//     });
// }

// async function forgetPassword(req, res, next) {
   
// }

// module.exports = {
//     create,
//     login,
//     forgetPassword,
// };

const connection = require('../index');
const jwt = require('jsonwebtoken');
const generateOtp = require('otp-generator');


const otps = {};

async function signup(req, res, next) {
    const { username, password, email } = req.body;

    const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    const values = [username, password, email];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting user data:', err);
            return res.status(500).json({ error: 'Error inserting user data' });
        }
        console.log('User data inserted successfully');
        return res.status(200).json({ message: 'User data inserted successfully' });
    });
}

async function login(req, res, next) {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const values = [username, password];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing login query:', err);
            return res.status(500).json({ error: 'Error executing login query' });
        }

        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = result[0];
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret_key', { expiresIn: '1h' });

        res.json({ success: true, token, message: 'Login successful' });
    });
}

async function forgetPassword(req, res, next) {
    const { username } = req.body;
    const otp = generateOtp.generate(6, { upperCase: false, specialChars: false });

    
    otps[username] = otp;

    console.log(`OTP for ${username}: ${otp}`);

    res.status(200).json({ message: 'OTP generated and stored locally', otp }); 
}

async function resetPassword(req, res, next) {
    const { username, otp, newPassword } = req.body;

    if (otps[username] !== otp) {
        return res.status(401).json({ error: 'Invalid OTP' });
    }

    const updateSql = 'UPDATE users SET password = ? WHERE username = ?';
    const updateValues = [newPassword, username];

    connection.query(updateSql, updateValues, (err, result) => {
        if (err) {
            console.error('Error updating password:', err);
            return res.status(500).json({ error: 'Error updating password' });
        }
       
        delete otps[username];
        res.status(200).json({ message: 'Password reset successful' });
    });
}

async function Delete(req,res,next){
    let id = req.params.id
    const sql = 'DELETE FROM users WHERE id = ?';
    connection.query(sql,[id],(err,result)=>{
        if(err){
            console.log(err)
            return res.status(400).json("error in deleting user")
        }
        if (result.affectedRows === 0) {
            console.error("user not found");
            return res.status(500).json({ error: 'user not found' });
        }
        res.status(200).json("user deleted")

    })

    
}


module.exports = {
    signup,
    login,
    forgetPassword,
    resetPassword,
    Delete
};
