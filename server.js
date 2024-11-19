const app = require("./src/app.js")
const PORT = 8080


const https = require('https');
const fs = require('fs');

const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/clima.amalfis.com.br/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/clima.amalfis.com.br/fullchain.pem')
}; 

const server = https.createServer(httpsOptions,app);

server.listen(PORT,()=>{
    console.log("Servidor ligado na porta: "+PORT);
    
})


