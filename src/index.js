const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connection } = require('./database/connection');

const app = express();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/*
  Swagger config
  Extended: https://swagger.io/specification/#infoObject
*/
const swaggerOptions = {
  swaggerDefinition:{
    info: {
      title: 'Pets API',
      description: 'Pets API Information',
      contact: {
        name: 'David Supo'
      },
      servers: ['http://localhost:5000']
    }
  },
  apis:['.routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


// Mis rutas
app.use('/api/login', require('./routes/auth'));

connection()
.then(()=>app.listen(PORT,()=>console.log(`running on ${PORT}`)))
.catch(err=>console.log('Ocurrió un error inesperado: ',err))
