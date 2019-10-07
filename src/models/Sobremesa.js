const {Schema, model} = require('mongoose');

const SobremesaSchema = new Schema({
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
        pais_origem: {
            type: String,
            required: [true, 'O pais de origem é obrigatório']
        },
    },
    {
        timestamps: true
    });

module.exports = model('Sobremesa', SobremesaSchema);
