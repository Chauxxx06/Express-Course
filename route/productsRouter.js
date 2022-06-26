const express = require('express'); // Importar en node el framework express
const { faker } = require('@faker-js/faker');

const router = express.Router();

//filter trabaja como id, se debe pòner simepre antes para todoa funcion en especifico
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

//peticion GET a una direccion product
router.get('/', (req, res) => {
  const {size} = req.query;
  const limit = size || 10;
  const products = [];
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});

//peticion GET se pide un parametro de id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id: id,
    name: 'smartphone',
    price: 2000,
  });
});

module.exports = router;
