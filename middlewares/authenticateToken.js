const jwt = require('jsonwebtoken');
const AuthenticationService = require("../services/AuthenticationService");


const authenticateService = new AuthenticationService();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  authenticateService.getKeys()
    .then(keys => {
      jwt.verify(token, keys.private, (err, user) => {
        console.log(err);

        if (err) return res.sendStatus(403);

        // add new informations here !
        user.firstInformation = "yollo";
        user.secondInformation = "woollo";


        req.user = user;
        next();
      });
    })
    .catch(error => {
      console.error(error);
      return res.sendStatus(500);
    });
}


module.exports = authenticateToken;