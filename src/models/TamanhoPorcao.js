const {Schema, model} = require('mongoose');

const TamanhoPorcaoSchema = new Schema({
        nome: {
            type: String,
            maxlength: [1, 'O nome é muito longo'],
            required: [true, 'O nome do tamanho da porção é obrigatório']
        },
    },
    {
        timestamps: true
    });

module.exports = model('TamanhoPorcao', TamanhoPorcaoSchema);
