const Porcao = require('../models/Porcao');

module.exports = {
    async index(req, res) {

        const porcao = await Porcao.find();

        return res.status(200).json(
            {
                success: true,
                data: porcao,
                message: 'Lista carregada com sucesso'
            }
        );
    },

    async show(req, res) {
        const {id} = req.params;

        await Porcao.findById(id).then(data => {
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

        const {nome, descricao, preco, imagem, tamanho} = req.body;

        const porcao = await Porcao.findOne({nome});

        if (porcao) {
            return res.status(409).json({success: false, message: 'Porção já cadastrada'})
        }

        await Porcao.create({
            nome,
            descricao,
            preco,
            imagem,
            tamanho
        }, (err, tamanho) => {
            if (err) {
                let {errors} = err;
                let {nome} = errors;

                if (nome) {
                    return res.status(400).json({success: false, message: nome.message});
                }
            } else if (tamanho) {
                return res.json({success: true, message: 'Porção inserida com sucesso'});
            }

        });

    },

    async update(req, res) {
        let {id} = req.params;

        let {nome, descricao, preco, imagem, tamanho} = req.body;

        await Porcao.updateOne({_id: id}, {nome, descricao, preco, imagem, tamanho}, {runValidators: true}).then(data => {

            return res.status(200).json(
                {
                    success: true,
                    message: 'Porção alterada com sucesso'
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

        await Porcao.remove({_id: id}).then(data => {
            let {deletedCount} = data;

            if (deletedCount === 0) {
                return res.status(401).json(
                    {
                        success: false,
                        message: 'Porção não encontrada'
                    }
                );
            }

            return res.status(200).json(
                {
                    success: true,
                    message: 'Porção deletada com sucesso'
                }
            );

        });

    }

};
