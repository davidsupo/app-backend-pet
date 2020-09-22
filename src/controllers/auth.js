const Person = require('../models/entity/person');
const User = require('../models/entity/user');

const  { verifyGoogleIdToken } = require('../helpers/googleVerifyToken');
const { generateJWT } = require('../helpers/jsonwebtoken');

exports.authUser = async (req,res) => {
  try{

    const googleToken = req.body.googleToken;
    const googleUser = await verifyGoogleIdToken(googleToken);
    if(!googleUser) return res.status(404).json({ok:false});

    // Verificar si existe en la base de datos
    const user = null;
    const person = await Person.findOne({email: googleUser.email});
    if(!person) {
      // Registrar una nueva Persona
      person = await Person.create({name: googleUser.name, picture: googleUser.picture, email: googleUser.email, isGoogleAuth: true});
      // Registrar nuevo usuario;
      user = await User.create({person: person.id});
    } else {
      user = await User.find({person: person.id});
    }

    // Generar mi JWT
    const expires = user.role === 'A' ? '4h' : '24h';
    const token = await generateJWT(user.id,expires);
    user.person = person;
    res.json({ok:true,token,user})


  }catch(err){ return res.status(500).json({ok:false, message:err.message, err})}
}
