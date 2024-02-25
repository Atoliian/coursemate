const jwt = require('jsonwebtoken');
const AuthenticationService = require("../services/AuthenticationService");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


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

        prisma.user.findFirstOrThrow({
          where: {
            AND: [
              {
                email: {
                  contains: user.email,
                },
              },
              {
                active: true,
              },
            ],
              
          },
        }).then(stockedUser => {
          req.user = {
            id: stockedUser.id,
            identifier: stockedUser.identifier,
            email: stockedUser.email,
            name: stockedUser.name,
            roles: user.roles
          };

          console.log(req.user);
          next()

        }).catch(error => {
          console.error(error);
          return res.sendStatus(500);
        });
      });
    })
    .catch(error => {
      console.error(error);
      return res.sendStatus(500);
    });
}


module.exports = authenticateToken;