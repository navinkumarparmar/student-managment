const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const routes = require('./routes/index');


app.use(cors()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


// app.get('/dashboard', (req, res) => {
    
//     res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
// });

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.use('/api', routes);

app.listen(5656, () => {
    console.log('Server is running on port 5656');
});
