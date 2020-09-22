/*
  path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { authUser } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateToken');

const router = Router();

/*
  Autenticarse con el token de Google
*/
router.post('/google/auth',[
  check('googleToken','El google token es obligatorio').not().isEmpty(),
  validateFields
], authUser)


/*
  Obtener un nuevo token
*/
router.get('/renew', validateJWT);

module.exports = router;