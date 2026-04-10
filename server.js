import http from 'node:http';
import fs from 'node:fs/promises';



const server = http.createServer(async (req, res) => {
    const {url, method} = req;
    if(url == '/' && method == 'GET'){
        const template = await fs.readFile('./index.html', 'utf-8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.writeHead(200);
        res.end(template)

    }

});

server.listen(3030)