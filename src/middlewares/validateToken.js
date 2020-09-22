const jwt = require('jsonwebtoken');

exports.validateJWT = (req,res,next) => {
  const token = req.header('x-token');
  if(!token) return res.status(401).json({ok:false,message:'No existe token en la petición'});
  try{
    if(!process.env.TOKEN_SECRET) throw new Error('No se proporciona TOKEN_SECRET');
    const { uid } = jwt.verify(token,process.env.TOKEN_SECRET);
    req.uid = uid;
    next();
  }catch(err){ return res.status(401).json({ok:false, message:'Token no válido'})}
}