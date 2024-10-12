const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile(path.join(__dirname, '../frontend/scouting.html'), (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading page');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  } else if (req.url === '/script.js' && req.method === 'GET') {
    fs.readFile(path.join(__dirname, '../frontend/script.js'), (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading script');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(content);
      }
    });
  } else if (req.url === '/submit' && req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += '\n'; // Corrected to use '\n'
      body += chunk.toString(); // Convert Buffer to string
      fs.appendFile('database.txt', body, err => {
        if (err) {
          console.error(err);
        } else {
          console.log('File written successfully');
        }
      });
    });
    

    req.on('end', () => {
      console.log('Received data:', body);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Data received successfully!');
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const ip = '192.168.1.162';
server.listen(3000, ip, () => {
  console.log(`Server running at http://${ip}:3000/`);
});
