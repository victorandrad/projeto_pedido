const Sobremesa = require('../models/Sobremesa');

module.exports = {
    async index(req, res) {

        const sobremesa = await Sobremesa.find();

        return res.status(200).json(
            {
                success: true,
                data: sobremesa,
                message: 'Lista carregada com sucesso'
            }
        );
    },

    async show(req, res) {
        const {id} = req.params;

        await Sobremesa.findById(id).then(data => {
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

        const {nome, descricao, preco, imagem, pais_origem} = req.body;

        const porcao = await Sobremesa.findOne({nome});

        if (porcao) {
            return res.status(409).json({success: false, message: 'Sobremesa já cadastrada'})
        }

        await Sobremesa.create({
            nome,
            descricao,
            preco,
            imagem,
            pais_origem
        }, (err, tamanho) => {
            if (err) {
                let {errors} = err;
                let {nome} = errors;

                if (nome) {
                    return res.status(400).json({success: false, message: nome.message});
                }
            } else if (tamanho) {
                return res.json({success: true, message: 'Sobremesa inserida com sucesso'});
            }

        });

    },

    async update(req, res) {
        let {id} = req.params;

        let {nome, descricao, preco, imagem, pais_origem} = req.body;

        await Sobremesa.updateOne({_id: id}, {nome, descricao, preco, imagem, pais_origem}, {runValidators: true}).then(data => {

            return res.status(200).json(
                {
                    success: true,
                    message: 'Sobremesa alterada com sucesso'
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

        await Sobremesa.remove({_id: id}).then(data => {
            let {deletedCount} = data;

            if (deletedCount === 0) {
                return res.status(401).json(
                    {
                        success: false,
                        message: 'Sobremesa não encontrada'
                    }
                );
            }

            return res.status(200).json(
                {
                    success: true,
                    message: 'Sobremesa deletada com sucesso'
                }
            );

        });

    }

};
