const express = require('express'); // Importar en node el framework express
const ProductServices = require('../services/productService');

const router = express.Router();
const productService = new ProductServices();

//filter trabaja como id, se debe pòner simepre antes para todoa funcion en especifico
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

//peticion GET a una direccion product
router.get('/', (req, res) => {
  const products = productService.find();
  res.json(products);
});

//peticion GET se pide un parametro de id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = productService.findOne(id);
  res.json(product);
});

//peticion POST para almaencar un producto nuevo
router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'created',
    id,
    data: body
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'created',
    id
  });
});


module.exports = router;
