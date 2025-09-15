// app.js
const express = require('express');
const app = express();
const port = 3000;

// Membuat Route ke halaman home dengan method GET
app.get('/',(req, res) => {
    res.send('Hello, ini halaman HOME dengan method GET');
});

// Middleware untuk parsing body request
app.use (express.json());

// Route POST
app.post('/submit', (req,res) => {
    const {name, npm, jenisKelamin } = req.body;
    res.send(`Hello, ${name} dengan NPM ${npm}.Apakah kamu ${jenisKelamin}?`);
});

//serving static file
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// ketika ada sebuah folder yang ingin diakses lewat browser maka menggunakan express static (ini sangat penting ketika kita ingin mempost suatu gambar atau file ke dalam browser)