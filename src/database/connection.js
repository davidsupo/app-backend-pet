const mongoose = require('mongoose');

exports.connection =  async() => {
  try{
    if(!process.env.MONGO_URI) throw new Error('No se proporciona la conexión a la base de datos.');
    await mongoose.connect(process.env.MONGO_URI,{
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }catch (error){
    throw new Error('Error en la base de datos');
  }
}