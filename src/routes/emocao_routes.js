const {Router} = require("express")
const emocao_controller = require("../controllers/emocao_cotroller.js")


const routes = Router();

routes.get('/api/emocao',(req,res)=>{emocao_controller.consulta_Todos_Emoti(req,res)})
routes.post('/api/emocao',(req,res)=>{emocao_controller.cadastrar_emocao(req,res)})
routes.delete('/api/emocao',(req,res)=>{emocao_controller.delete_emocao(req,res)})


module.exports = routes