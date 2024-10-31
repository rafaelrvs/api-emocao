
const db= require("../models/index.js")
const uuid = require("uuid")
const { validate: isUUID } = require('uuid');

class Emocao_controller{

    static async consulta_Todos_Emoti(req,res){
        const emoticons = await db.Sentimento.findAll()

        if(emoticons.length){
            return res.status(200).json(emoticons)
        }else{
            return res.status(500).json({message:"Nenhuma emoção encontrada"})
        }
        

    }

    static async cadastrar_emocao(req,res){
        const {name} = req.body 
        if (!name) {
            return res.status(500).json({message:"preencha os campos necessarios"})
        }else{
            
            const emocao = await db.Sentimento.findOne({
                where: {name: name},
            })

            if(!emocao){
                const cadastroEmocao = await db.Sentimento.create({
                    id:uuid.v4(),
                    name: name,
                })
                return res.status(200).json({message:"Cadastro realizado",emocao:cadastroEmocao})
            }else{
                return res.status(500).json({message:"Já existe uma emoção com esse nome"})

            }
            
        }
    }


    static async delete_emocao(req, res) {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Preencha os campos necessários" });
        }

        if (!isUUID(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const emocao = await db.Sentimento.findOne({
            where: { id: id }
        });

        if (emocao) {
            await db.Sentimento.destroy({
                where: { id: id }
            });
            return res.status(200).json({ message: "Emoção deletada com sucesso!" });
        } else {
            return res.status(404).json({ message: "Emoção não encontrada" });
        }
    }


}
module.exports = Emocao_controller