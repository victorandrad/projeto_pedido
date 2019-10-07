const {Schema, model} = require('mongoose');

const HamburguerSchema = new Schema({
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
        ponto_carne: [{
            type: Schema.Types.ObjectId,
            ref: 'PontoCarne',
            required: [true, 'O ponto da carne é obrigatório']
        }],
    },
    {
        timestamps: true
    });

module.exports = model('Hamburguer', HamburguerSchema);
