const {Schema, model} = require('mongoose');

const BebidaSchema = new Schema({
        nome: {
            type: String,
            minlength: [2, 'O nome é muito curto'],
            maxlength: [100, 'O nome é muito longo'],
            required: [true, 'O nome do produto é obrigatório']
        },
        descricao: {
            type: String,
            maxlength: [1000, 'A descrição é muito longa'],
            required: false
        },
        preco: Number,
        imagem: {
            type: String,
            required: [true, 'A imagem do produto é obrigatória']
        },
        marca: {
            type: String,
            required: [true, 'A marca do produto é obrigatória']
        },
    },
    {
        timestamps: true
    });

module.exports = model('Bebida', BebidaSchema);
