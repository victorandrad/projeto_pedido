const {Schema, model} = require('mongoose');

const PontoCarneSchema = new Schema({
        nome: {
            type: String,
            minlength: [1, 'O nome é muito curto'],
            maxlength: [30, 'O nome é muito longo'],
            required: [true, 'O nome do ponto da carne é obrigatória']
        },
    },
    {
        timestamps: true
    });

module.exports = model('PontoCarne', PontoCarneSchema);
