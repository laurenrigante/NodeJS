
const http = require('http');

const server=http.createServer((req,res)=>{
    const url=req.url;
    const method=req.method;

    if(url==="/"){
        res.write('<html>');
        res.write('<head> <title> My Project </title> </head>');
        res.write('<body> <form action="/create-user" method="POST"> <input type="text" name="username" placeholder="Enter username"> <button type="submit"> Send </button> </form></body>');
        res.write('</html>');
       return res.end();
    }

    if(url==="/create-user" && method==="POST"){
        const body = [];
           req.on('data', (chunk) => {
             console.log(chunk);
             body.push(chunk);
           });
           req.on('end', () => {
             const parsedBody = Buffer.concat(body).toString();
             const message = parsedBody.split('=')[1];
            console.log(message);
           });
           res.statusCode = 302;
           res.setHeader('Location', '/');
           return res.end();
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head> <title> My Project </title> </head>');
    res.write('<body> <h1> Hello from the users node js app </h1> </body>');
    res.write('</html>');
    res.end();
});
    
server.listen(3000);