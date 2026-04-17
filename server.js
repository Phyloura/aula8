import http from 'node:http';
import fs from 'node:fs/promises';

const server = http.createServer(async (req, res) => {
    const {url, method} = req;
    if(url == '/' && method == 'GET'){
        const template = await fs.readFile('./index.html', 'utf-8');

        const dadosBacon = await fs.readFile('inventario.json', 'utf-8');
        const inventario = JSON.parse(dadosBacon);
        console.log('Dados carregados: ', inventario);

        const linhasTabela = inventario.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.nome}</td>
                <td>${item.categoria}</td>
                <td>${item.quantidade}</td>
            </tr>
        `).join('');

        const paginaFinal = template.replace('{{TABELA}}', linhasTabela);

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.writeHead(200);
        res.end(paginaFinal);

    }

});

server.listen(3030)