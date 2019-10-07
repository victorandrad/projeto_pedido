const Hamburguer = require('../models/Hamburguer');

module.exports = {
    async index(req, res) {

        const hamburguer = await Hamburguer.find();

        return res.status(200).json(
            {
                success: true,
                data: hamburguer,
                message: 'Lista carregada com sucesso'
            }
        );
    },

    async show(req, res) {
        const {id} = req.params;

        await Hamburguer.findById(id).then(data => {
            return res.status(200).json(
                {
                    success: true,
                    data: data,
                    message: 'DONE'
                }
            );
        }).catch(() => {
            return res.status(400).json(
                {
                    success: false,
                    message: 'NOT_FOUND'
                }
            );
        });


    },

    async store(req, res) {

        // Isso não está funcionando, verificar outro método para verificar se o body está vazio
        if (!req.body) {
            return res.status(400).json({
                message: 'A requisição está vazia'
            });
        }

        const {nome, descricao, preco, imagem, ponto_carne} = req.body;

        const hamburguer = await Hamburguer.findOne({nome});

        if (hamburguer) {
            return res.status(409).json({success: false, message: 'Hambúrguer já cadastrado'})
        }

        await Hamburguer.create({
            nome,
            descricao,
            preco,
            imagem,
            ponto_carne
        }, (err, tamanho) => {
            if (err) {
                let {errors} = err;
                let {nome} = errors;

                if (nome) {
                    return res.status(400).json({success: false, message: nome.message});
                }
            } else if (tamanho) {
                return res.json({success: true, message: 'Hambúrguer inserido com sucesso'});
            }

        });

    },

    async update(req, res) {
        let {id} = req.params;

        let {nome, descricao, preco, imagem, ponto_carne} = req.body;

        await Hamburguer.updateOne({_id: id}, {nome, descricao, preco, imagem, ponto_carne}).then(data => {

            return res.status(200).json(
                {
                    success: true,
                    message: 'Hambúrguer alterado com sucesso'
                }
            );

        }).catch(err => {
            return res.status(200).json(
                {
                    success: false,
                    message: 'Erro ao alterar tamanho'
                }
            );
        });
    },

    async delete(req, res) {

        console.log(req.params);

        let {id} = req.params;

        await Hamburguer.remove({_id: id}).then(data => {
            let {deletedCount} = data;

            if (deletedCount === 0) {
                return res.status(401).json(
                    {
                        success: false,
                        message: 'Hambúrguer não encontrado'
                    }
                );
            }

            return res.status(200).json(
                {
                    success: true,
                    message: 'Hambúrguer deletado com sucesso'
                }
            );

        });

    }

};
