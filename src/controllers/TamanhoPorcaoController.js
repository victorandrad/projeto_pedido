const TamanhoPorcao = require('../models/TamanhoPorcao');

module.exports = {
    async index(req, res) {

        const ponto_carne = await TamanhoPorcao.find();

        return res.status(200).json(
            {
                success: true,
                data: ponto_carne,
                message: 'Lista carregada com sucesso'
            }
        );
    },

    async show(req, res) {
        const {id} = req.params;

        await TamanhoPorcao.findById(id).then(data => {
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

        const {nome} = req.body;

        const ponto_carne = await TamanhoPorcao.findOne({nome});

        if (ponto_carne) {
            return res.status(409).json({success: false, message: 'Tamanho da porção já cadastrado'})
        }

        await TamanhoPorcao.create({
            nome,
        }, (err, tamanho) => {
            if (err) {
                let {errors} = err;
                let {nome} = errors;

                if (nome) {
                    return res.status(400).json({success: false, message: nome.message});
                }
            } else if (tamanho) {
                return res.json({success: true, message: 'Tamanho da porção inserido com sucesso'});
            }

        });

    },

    async update(req, res) {
        let {id} = req.params;

        let {nome} = req.body;

        await TamanhoPorcao.updateOne({_id: id}, {nome}, {runValidators: true}).then(data => {

            return res.status(200).json(
                {
                    success: true,
                    message: 'Tamanho alterado com sucesso'
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

        await TamanhoPorcao.remove({_id: id}).then(data => {
            let {deletedCount} = data;

            if (deletedCount === 0) {
                return res.status(401).json(
                    {
                        success: false,
                        message: 'Tamanho da porção não encontrado'
                    }
                );
            }

            return res.status(200).json(
                {
                    success: true,
                    message: 'Tamanho da porção deletado com sucesso'
                }
            );

        });

    }

};
