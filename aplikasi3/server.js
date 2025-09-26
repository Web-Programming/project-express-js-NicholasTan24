const express = require("express");
const app = express();
const port = 3000;

//serving static file
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:3000/:`);

// apa yang akan terjadi jika tidak ada node_modules di dalam folder project
// node js saat menjalankan 'node server.js'

//module di dalam folder ini penting karena kita ingin menggunakan express
//jika kasusnya node_module tidak ada di dalam project maka tinggal buat perintah npm install

//"scripts": {
    //"serve": "node server.js"
  //},
  // ini adalah kegunaan script yang kita buat untuk mencegah flag yang panjang atau cara lain bisa juga dengan npm run serve (sifatnya opsional)

// cara install express adalah npm install -g express-generator
// cara buat project express adalah express {--view=(ejs/pug/handlebars)} {nama-project}
// untuk install bootstrap maka pakai npm install bootstrap
});