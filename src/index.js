const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connection } = require('./database/connection');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


// Mis rutas
app.use('/api/login', require('./routes/auth'));

connection()
.then(()=>app.listen(PORT,()=>console.log(`running on ${PORT}`)))
.catch(err=>console.log('Ocurrió un error inesperado: ',err))
