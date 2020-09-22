const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

exports.verifyGoogleIdToken = async(token) => {
  try{
    if(!CLIENT_ID) throw new Error('No se proporciona el CLIENT_ID');
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:[
        CLIENT_ID,
        // TODO: Agregar los demás CLIENT_ID
      ]
    });

    const payload = ticket.getPayload();

    if(!payload) throw new Error('No llegó información del payload');
    return {name: payload['name'], picture: payload['picture'], email: payload['email']};

  }catch( error ){ throw new Error('Error al consultar token de Google'); }
}
