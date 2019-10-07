const PontoCarne = require('../models/PontoCarne');

module.exports = {
    async index(req, res) {

        const ponto_carne = await PontoCarne.find();

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

        await PontoCarne.findById(id).then(data => {
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

        const ponto_carne = await PontoCarne.findOne({nome});

        if (ponto_carne) {
            return res.status(409).json({success: false, message: 'Ponto da carne já cadastrado'})
        }

        await PontoCarne.create({
            nome,
        }, (err, tamanho) => {
            if (err) {
                let {errors} = err;
                let {nome} = errors;

                if (nome) {
                    return res.status(400).json({success: false, message: nome.message});
                }
            } else if (tamanho) {
                return res.json({success: true, message: 'Ponto da carne inserido com sucesso'});
            }

        });

    },

    async update(req, res) {
        let {id} = req.params;

        let {nome} = req.body;

        await PontoCarne.updateOne({_id: id}, {nome}).then(data => {

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

        await PontoCarne.remove({_id: id}).then(data => {
            let {deletedCount} = data;

            if (deletedCount === 0) {
                return res.status(401).json(
                    {
                        success: false,
                        message: 'Ponto da carne não encontrado'
                    }
                );
            }

            return res.status(200).json(
                {
                    success: true,
                    message: 'Ponto da carne deletado com sucesso'
                }
            );

        });

    }

};
