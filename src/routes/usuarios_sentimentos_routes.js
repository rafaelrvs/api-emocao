const {Router} = require("express")
const Usuarios_sentimentos_controller = require("../controllers/usuarios_sentimentos_controller.js")



const routes = Router();

routes.get('/api/usuario_emocao/',(req,res)=>{Usuarios_sentimentos_controller. consulta_usuario_emocao(req,res)})
routes.post('/api/usuario_emocao/',(req,res)=>{Usuarios_sentimentos_controller.cadastrar_usuario_emocao(req,res)})



module.exports = routes