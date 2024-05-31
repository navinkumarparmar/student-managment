const connection = require('../index');

async function create(req, res, next) {
    const { studentid, semester, cgpa } = req.body;

    const sql = 'INSERT INTO result (studentid, semester, cgpa) VALUES (?, ?, ?)';
    const values = [studentid, semester, cgpa];

    connection.query(sql, values, (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                console.log("Student already has result for this semester");
                return res.status(400).json({ validationError: 'Student already has result for this semester' });
            } else {
                console.error('Something went wrong:', err);
                return res.status(400).json({ error: 'Something went wrong' });
            }
        }

        console.log('Result data inserted successfully');
        return res.status(200).json({ message: 'Result data inserted successfully' });
    });
}



async function getallresultdata(req,res,next){
    const sql = 'SELECT * FROM result';
    
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching result data:', err);
            return res.status(500).json({ error: 'Error fetching result data' });
        }

       
        return res.status(200).json(results);
    });
}

async function Delete(req, res, next) {
    let studentId = req.params.id;
    let sql = 'DELETE FROM result WHERE studentid = ?';

    connection.query(sql, studentId, (err, result) => {
        if (err) {
            console.error("Error deleting result:", err);
            return res.status(500).json({ error: 'Error deleting result' });
        }

        if (result.affectedRows === 0) {
            console.error("Result not found");
            return res.status(500).json({ error: 'Result not found' });
        }

        console.log("Successfully deleted result");
        return res.status(200).json({ message: "Successfully deleted result" });
    });
}


async function getresultstudent(req,res,next){
    const studentId = req.params.id;
    const sql = `
        SELECT s.name , r.semester, r.cgpa
        FROM result r
        INNER JOIN students s ON r.studentid = s.studentid
        WHERE r.studentid = ?
    `;

    connection.query(sql, studentId, (err, results) => {
        if (err) {
            console.error('Error fetching result student data:', err);
            return res.status(500).json({ error: 'Error fetching result student data' });
        }

        return res.status(200).json(results);
    });
}





module.exports = {
    create,
    getallresultdata,
    Delete,
    getresultstudent
    
};







     
