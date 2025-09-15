// app.js
const http = require('http');
//ini untuk membuat server
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, Nicholas!\n');
});
// ini untuk membuka portal server
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
// cara jalankannya yaitu : node app.js
// jangan matikan perintah runningnya selama webnya masih berjalan
// cara matikan perintahnya yaitu dengan cara ctrl+c saja