const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next)=>{
  let token = req.headers.authorization
  try {
    const decoded = jwt.verify(token, 'PRIVATE_KEY');
    next()
  } catch(err) {
    res.redirect('/login')
  }
}

module.exports.isLoggedIn = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (user) {
      req.user = user
      next();
    }else{
      res.send({
        "status": 1,
        "msg": "Username or Password is not correct!"
      })
    }
  })(req, res);
}




