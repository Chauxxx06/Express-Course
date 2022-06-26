const express = require('express'); // Importar en node el framework express

const router = express.Router();

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No hay Parametros');
  }
});

module.exports = router
