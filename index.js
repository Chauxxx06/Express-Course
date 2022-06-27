const express = require('express'); // Importar en node el framework express
const routerApi = require('./route');
const { logErrors, errorHandler, boomErrorHandler } = require('./middleware/errorHandler');
const cors = require('cors'); //CORS permite que varios dominios autorizados puedan conectarse al API
const app = express(); // se instacion el obejto de express
const port = 3000; // se indica el puerto tcp donde escuhara el app
const whiteList= ["http://localhost:8080"];
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin)){
      callback(null, true);
    }else{
      callback(new Error('No Permit'));
    }
  }
};

/*
//peticion GET hjacia el servidor, este deberia responde el texto anexo al send
app.get('/', (req, res) => {
  res.send('My server en ExpressJS');
});

//peticion get a una router
app.get('/newEndpoint', (req, res) => {
  res.send('Nueva ruta');
}); */

app.use(express.json());
app.use(cors(options));
routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//alisto el app para que esuche en el puerto 3000
app.listen(port, () => {
  /* console.log('Listening in 3000 port'); */
});
