const Bebida = require('../models/Bebida');

module.exports = {
    async index(req, res) {

        const bebida = await Bebida.find();

        return res.status(200).json(
            {
                success: true,
                data: bebida,
                message: 'Lista carregada com sucesso'
            }
        );
    },

    async show(req, res) {
        const {id} = req.params;

        await Bebida.findById(id).then(data => {
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

        const {nome, descricao, preco, imagem, marca} = req.body;

        const ponto_carne = await Bebida.findOne({nome});

        if (ponto_carne) {
            return res.status(409).json({success: false, message: 'Bebida já cadastrada'})
        }

        await Bebida.create({
            nome,
            descricao,
            preco,
            imagem,
            marca
        }, (err, tamanho) => {
            if (err) {
                let {errors} = err;
                let {nome} = errors;

                if (nome) {
                    return res.status(400).json({success: false, message: nome.message});
                }
            } else if (tamanho) {
                return res.json({success: true, message: 'Bebida inserida com sucessa'});
            }

        });

    },

    async update(req, res) {
        let {id} = req.params;

        let {nome, descricao, preco, imagem, marca} = req.body;

        await Bebida.updateOne({_id: id}, {nome, descricao, preco, imagem, marca}, {runValidators: true}).then(data => {

            return res.status(200).json(
                {
                    success: true,
                    message: 'Bebida alterada com sucesso'
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

        await Bebida.remove({_id: id}).then(data => {
            let {deletedCount} = data;

            if (deletedCount === 0) {
                return res.status(401).json(
                    {
                        success: false,
                        message: 'Bebida não encontrada'
                    }
                );
            }

            return res.status(200).json(
                {
                    success: true,
                    message: 'Bebida deletada com sucesso'
                }
            );

        });

    }

};
