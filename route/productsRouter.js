const express = require('express'); // Importar en node el framework express
const ProductServices = require('../services/productService');

const router = express.Router();
const productService = new ProductServices();

//filter trabaja como id, se debe pòner simepre antes para todoa funcion en especifico
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

//peticion GET a una direccion product
router.get('/', async (req, res) => {
  const products = await productService.find();
  res.json(products);
});

//peticion GET se pide un parametro de id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productService.findOne(id);
  res.json(product);
});

//peticion POST para almaencar un producto nuevo
router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await productService.create(body);
  res.status(201).json({newProduct});
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateProduct = await productService.update(id, body);
    res.json(updateProduct);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await productService.delete(id);
  res.json(deleteProduct);
});


module.exports = router;
