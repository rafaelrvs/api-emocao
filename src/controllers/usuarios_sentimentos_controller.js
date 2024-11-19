const db = require("../models/index.js");
const { validate: isUUID, v4: uuidv4 } = require('uuid');
const WebSocket = require('ws');

let wsClient;

// Função para conectar ao WebSocket
function connectWebSocket() {
    if (wsClient) {
        wsClient.close(); // Fecha a conexão existente, se houver
    }

    wsClient = new WebSocket('ws://localhost:8000');

    wsClient.onopen = () => {
        console.log('Conexão WebSocket estabelecida');
    };

    wsClient.onclose = () => {
        console.log('Conexão WebSocket fechada. Tentando reconectar...');
        setTimeout(connectWebSocket, 5000); // Reconecta após 5 segundos
    };

    wsClient.onerror = (error) => {
        console.error('Erro no WebSocket:', error.message);
    };
}

// Inicializa a conexão WebSocket
connectWebSocket();

class UsuariosSentimentosController {
    /**
     * Cadastrar emoção para um usuário
     */
    static async cadastrar_usuario_emocao(req, res) {
        const { sentimento_id } = req.body;

        // Validação de entrada
        if (!sentimento_id) {
            return res.status(400).json({ message: "Informe um valor para 'sentimento_id'" });
        }

        if (!isUUID(sentimento_id)) {
            return res.status(400).json({ message: "O 'sentimento_id' deve ser um UUID válido" });
        }

        try {
            // Verificar se o sentimento_id existe no banco
            const sentimento = await db.Sentimento.findByPk(sentimento_id);
            if (!sentimento) {
                return res.status(404).json({ message: "Sentimento não encontrado" });
            }

            const data = new Date();

            // Criar o registro em Usuario_sentimento
            const cadastroUsuarioEmocao = await db.Usuario_sentimento.create({
                id: uuidv4(),
                sentimento_id: sentimento_id,
                data_criacao: data,
            });

            // Envia uma mensagem ao WebSocket
            if (wsClient && wsClient.readyState === WebSocket.OPEN) {
                const message = {
                    type: "novo_cadastro",
                    data: {
                        id: cadastroUsuarioEmocao.id,
                        sentimento_id: cadastroUsuarioEmocao.sentimento_id,
                        data_criacao: cadastroUsuarioEmocao.data_criacao,
                    },
                };
                wsClient.send(JSON.stringify(message));
                console.log('Mensagem enviada ao WebSocket:', message);
            } else {
                console.error('Conexão WebSocket não está aberta. Mensagem não enviada.');
            }

            // Retorna a resposta com sucesso
            return res.status(200).json({ 
                message: "Cadastro realizado com sucesso", 
                emocao: cadastroUsuarioEmocao 
            });
        } catch (error) {
            console.error("Erro ao cadastrar emoção:", error);
            return res.status(500).json({ message: "Erro ao cadastrar emoção", error: error.message });
        }
    }

    /**
     * Consultar emoções de usuários
     */
    static async consulta_usuario_emocao(req, res) {
        try {
            const emoticons = await db.Usuario_sentimento.findAll();

            if (emoticons.length) {
                return res.status(200).json(emoticons);
            } else {
                return res.status(404).json({ message: "Nenhuma emoção encontrada" });
            }
        } catch (error) {
            console.error("Erro ao buscar emoções:", error);
            return res.status(500).json({ message: "Erro ao buscar emoções" });
        }
    }
}

module.exports = UsuariosSentimentosController;
