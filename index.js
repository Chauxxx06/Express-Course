const express = require('express'); // Importar en node el framework express
const routerApi = require('./route');
/* const { faker } = require('@faker-js/faker'); */
const app = express(); // se instacion el obejto de express
const port = 3000; // se indica el puerto tcp donde escuhara el app

//peticion GET hjacia el servidor, este deberia responde el texto anexo al send
app.get('/', (req, res) => {
  res.send('My server en ExpressJS');
});

//peticion get a una router
app.get('/newEndpoint', (req, res) => {
  res.send('Nueva ruta');
});

routerApi(app);

//alisto el app para que esuche en el puerto 3000
app.listen(port, () => {
  /* console.log('Listening in 3000 port'); */
});
