const jwt = require('jsonwebtoken');


exports.generateJWT = ( uid ,expires ) => {
  return new Promise((resolve,reject) => {
    const payload = {uid};
    if(!process.env.TOKEN_SECRET) return reject('No se proporciona SECRET_TOKEN');
    jwt.sign(payload,process.env.TOKEN_SECRET,{
      expiresIn: expires
    },(err, token) => {
      if(err) reject('No se puedo generar el JWT');
      else resolve(token);
    })
  })
}

exports.validateJWT = ( token ) => {
  if(!token) return [false, null];
  try{
    if(!process.env.TOKEN_SECRET) throw new Error('No se proporciona SECRET_TOKEN');
    const { uid } = jwt.verify(token, process.env.TOKEN_SECRET);
  }catch(err){
    return [false,null];
  }
}