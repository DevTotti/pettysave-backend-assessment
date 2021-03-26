const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    let tokenPassed = req.headers['x-access-token'] || req.headers.authorization || req.body.token;
    tokenPassed = tokenPassed.split(' ');
    const [, token] = tokenPassed;
    const decoded = jwt.verify(token, jwtSecret);
    req.userDecoded = decoded;
    req.email = decoded.email;
    req.id = decoded.iserID;
    next();
  } catch (error) {
    res.json({
      error: true,
      message: 'Auth failed!',
    });
  }
};
