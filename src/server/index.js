const path = require('path');
const http = require('http');
const express = require('express');
const serveIndex = require('serve-index');
const serveStatic = require('serve-static');

const PUBLIC_DIR = path.join(__dirname, 'public');

const app = express();

app.set('port', 3000);

app.use(serveIndex(PUBLIC_DIR, {icons: true}));
app.use(serveStatic(PUBLIC_DIR));

const server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});

