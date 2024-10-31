const db = require("../models/index.js")
const { validate: isUUID, v4: uuidv4 } = require('uuid');


class Usuarios_sentimentos_controller{


    static async cadastrar_usuario_emocao(req, res) {
        const { sentimento_id } = req.body;
    
        // Validação do sentimento_id
        if (!sentimento_id) {
            return res.status(400).json({ message: "Informe um valor para 'sentimento_id'" });
        }
        
        if (!isUUID(sentimento_id)) {
            return res.status(400).json({ message: "O 'sentimento_id' deve ser um UUID válido" });
        }
    
        try {
            // Verificar se o sentimento_id existe
            const sentimento = await db.Sentimento.findByPk(sentimento_id);
            if (!sentimento) {
                return res.status(404).json({ message: "Sentimento não encontrado" });
            }
    
            const data = new Date();
            
            // Tentar criar o registro em Usuario_sentimento
            const cadastro_usuario_Emocao = await db.Usuario_sentimento.create({
                id: uuidv4(),
                sentimento_id: sentimento_id,
                data_criacao: data
            });
    
            return res.status(200).json({ message: "Cadastro realizado com sucesso", emocao: cadastro_usuario_Emocao });
    
        } catch (error) {
            // Logar o erro para depuração
            console.error("Erro ao cadastrar emoção:", error);
    
            // Retornar uma resposta de erro
            return res.status(500).json({ message: "Erro ao cadastrar emoção", error: error.message });
        }
    }

    
    

}
module.exports = Usuarios_sentimentos_controller