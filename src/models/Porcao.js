const {Schema, model} = require('mongoose');

const PorcaoSchema = new Schema({
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
        tamanho: [{
            type: Schema.Types.ObjectId,
            ref: 'TamanhoPorcao',
            required: [true, 'O tamanho da porção é obrigatório']
        }],
    },
    {
        timestamps: true
    });

module.exports = model('Porcao', PorcaoSchema);
