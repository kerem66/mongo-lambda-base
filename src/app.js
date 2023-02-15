const http = require('http');
const crud = require('./crud');

const hostname = '127.0.0.1';
const port = 8000;

const server = http.createServer(async (req, res) => {
    // creating mock data
    const data = [
        {
            id: 'String',
            targetUserCompany: 'String',
            userEmail: 'String',
            targetUserEmail: 'String',
            status: 'String',
            user2Company: 'String',
            userCompany: 'String',
            service: 'String',
            checkIn: new Date(),
            user2Email: 'String',
            archived: ['String', 'String'],
            data: {
                key1: 'value1',
                key2: 'value2'
            },
            userId: 'String',
            expirationTime: new Date(),
            shareable: true,
            targetUser: {},
            user2: {}
        }
    ];
    try {
        const cr = await crud.create(data);
        console.log(cr);
    } catch (e) {
        console.log(e);
    }

    const result = await crud.readMany({});
    console.log(result);
    // you can check the result in the logs

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Done');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});