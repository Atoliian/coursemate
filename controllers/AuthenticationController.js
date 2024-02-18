const { validationResult, check } = require("express-validator");
const AuthenticationService = require("../services/AuthenticationService");
const MailerService = require("../services/MailerService");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authenticationService = new AuthenticationService();
const mailerService = new MailerService();



const authenticationController = {
    getAll: async (req, res) => {
        try {
        // traitement à faire
          res.status(200).json(users);
        } catch (error) {
          console.error("Error retrieving users :", error);
          res.status(500).json({ error: "Error server" });
        }
    },
    register: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(422).json({ errors: errors.array() });
            }

            let { name, password, email, winnie } = req.body;

            if(winnie){
                res.status(500).json("Error server 🍯");
                res.end();
            }

            let identifier = await authenticationService.generateIdentifier(name);
            password = await authenticationService.cryptPassword(password);
 
            if(typeof password === 'object' && password !== null){
                res.status(500).json(password);
                res.end();
            }

            let magikLink = await authenticationService.createMagiklinktoken();
            const newUser = await prisma.user.create({
                data: {
                  name,
                  password,
                  identifier,
                  email,
                  magikLink
                },
              });
            await mailerService.sendValidationEmail({"name": name, "email": email, "token": magikLink});
            res.status(200).json(`Account creation ok, an email will be sent to the address: ${email}`);
        } catch (error) {
          console.error("Error retrieving user :", error);
          res.status(500).json({ error: "Error server" });
        }
    },
    login: async (req, res) => {
        try {
        // recuperer le l'entité du user qui se connecte
          const token = await authenticationService.createTokenJWT({
            'email': "email@example.com",
            'identifier': "userTester",
            'roles' : "devapmailer" ? 'ROLE_ADMIN' : 'ROLE_USER'
          });
          res.status(200).json(token);
        } catch (error) {
          console.error("Error retrieving user :", error);
          res.status(500).json({ error: "Error server" });
        }
    },
    emailValidation: async (req, res) => {
      try {
        const magikToken = req.query.token;
        const user = await prisma.user.findFirstOrThrow({
          where: {
            magikLink: {
              contains: magikToken,
            },
          },
        });

        const userUpdated = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            magikLink : null,
            active : true,
          },
        });
        res.status(200).json("The account has been successfully activated");
      } catch (error) {
        console.error("Error retrieving user :", error);
        res.status(404).json({ error: "Your email is no longer valid, your account no longer exists" });
      }
    },
};


module.exports = authenticationController;