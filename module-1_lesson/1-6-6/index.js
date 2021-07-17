import http from 'http';

http.createServer((req, res) => {
    if (req.method == 'GET') {
        res.write(`get path: ${req.url.slice(1)} `);
    }
    res.write('Hello World!');
    res.statusCode = 200;
    res.end();
}).listen(8080);