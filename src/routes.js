const express = require('express');
const PontoCarneController = require('./controllers/PontoCarneController');
const TamanhoPorcaoController = require('./controllers/TamanhoPorcaoController');
const BebidaController = require('./controllers/BebidaController');
const HamburguerController = require('./controllers/HamburguerController');
const PorcaoController = require('./controllers/PorcaoController');
const SobremesaController = require('./controllers/SobremesaController');

const routes = express.Router();

routes.get('/ponto_carne', PontoCarneController.index);
routes.get('/ponto_carne/:id', PontoCarneController.show);
routes.post('/ponto_carne', PontoCarneController.store);
routes.put('/ponto_carne/:id', PontoCarneController.update);
routes.delete('/ponto_carne/:id', PontoCarneController.delete);

routes.get('/tamanho_porcao', TamanhoPorcaoController.index);
routes.get('/tamanho_porcao/:id', TamanhoPorcaoController.show);
routes.post('/tamanho_porcao', TamanhoPorcaoController.store);
routes.put('/tamanho_porcao/:id', TamanhoPorcaoController.update);
routes.delete('/tamanho_porcao/:id', TamanhoPorcaoController.delete);

routes.get('/bebida', BebidaController.index);
routes.get('/bebida/:id', BebidaController.show);
routes.post('/bebida', BebidaController.store);
routes.put('/bebida/:id', BebidaController.update);
routes.delete('/bebida/:id', BebidaController.delete);

routes.get('/hamburguer', HamburguerController.index);
routes.get('/hamburguer/:id', HamburguerController.show);
routes.post('/hamburguer', HamburguerController.store);
routes.put('/hamburguer/:id', HamburguerController.update);
routes.delete('/hamburguer/:id', HamburguerController.delete);

routes.get('/porcao', PorcaoController.index);
routes.get('/porcao/:id', PorcaoController.show);
routes.post('/porcao', PorcaoController.store);
routes.put('/porcao/:id', PorcaoController.update);
routes.delete('/porcao/:id', PorcaoController.delete);

routes.get('/sobremesa', SobremesaController.index);
routes.get('/sobremesa/:id', SobremesaController.show);
routes.post('/sobremesa', SobremesaController.store);
routes.put('/sobremesa/:id', SobremesaController.update);
routes.delete('/sobremesa/:id', SobremesaController.delete);

module.exports = routes;
