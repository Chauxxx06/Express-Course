const express = require('express'); // Importar en node el framework express
const ProductServices = require('../services/productService');
const validatorHandler = require('../middleware/validatorHandler');
const { createProductSchema, getProductSchema } = require('../schemas/productSchema')

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
//Adicion de middleware, inicilamente inicia con la validacion del schema, luego de validacion sigue con el middleware
//de request-respond (HTTP), si hay falla, sigue con el middleware del Error, predefinido en el Index General
router.get('/:id',
  validatorHandler(getProductSchema, 'params') ,
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.findOne(id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

//peticion POST para almaencar un producto nuevo
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const newProduct = await productService.create(body);
  res.status(201).json({newProduct});
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateProduct = await productService.update(id, body);
    res.json(updateProduct);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await productService.delete(id);
    res.json(deleteProduct);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
