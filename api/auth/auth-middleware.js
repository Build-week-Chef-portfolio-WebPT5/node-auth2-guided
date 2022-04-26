const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');
const User = require('../users/users-model');

// AUTHENTICATION
const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  const MESSAGE_401 = 'You must be logged in to access this API';

  jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
    if(err) {
      console.log('Error:', err)
      next({ status: 401, message: MESSAGE_401 });
      return;
    }

    const user = await User.findById(decodedToken.subject);
    if(decodedToken.iat < user.logged_out_time) {
      next({ status: 401, message: MESSAGE_401 });
      return;
    }

    req.decodedJwt = decodedToken;
    console.log('decoded token:', req.decodedJwt);
    next();
  })
}

// AUTHORIZATION
function checkRole(...roles) {
  return (req, res, next) => {
    if(roles.includes(req.decodedJwt.role)) {
      next();
    } else {
      next({ status: 403, message: 'You are not authorized to access this API' });
    }
  }
}

module.exports = {
  restricted,
  checkRole,
}
