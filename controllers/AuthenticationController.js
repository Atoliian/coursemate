const { validationResult, check } = require("express-validator");
const AuthenticationService = require("../services/AuthenticationService");
const MailerService = require("../services/MailerService");
const DefaultService = require("../services/DefaultService");
const SerializerService = require("../services/SerializerService");
const { PrismaClient } = require("@prisma/client");
require('dotenv').config();
const prisma = new PrismaClient();


const defaultService = new DefaultService();
const serializerService = new SerializerService();
const authenticationService = new AuthenticationService();
const mailerService = new MailerService();



const authenticationController = {
    getAll: async (req, res) => {
        try {
          const currentPage = parseInt(req.query.page) || 1;
          const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
          const keyword = req.query.search;
          let query = keyword
            ? await prisma.user.findMany({
              where: {
                identifier: {
                  contains: keyword,
                },
              },
            })
            : await prisma.user.findMany();
            console.log(query);
          query = await serializerService.userSerialize(query, ['identifier']);
          console.log(query);
          const users = await defaultService.paginate(
            query,
            "users",
            currentPage,
            itemsPerPage
          );
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
          let { email, password, winnie } = req.body;

          if(winnie){
            res.status(500).json("Error server 🍯");
            res.end();
          }

          const user = await prisma.user.findFirstOrThrow({
            where: {
              AND: [
                {
                  email: {
                    contains: email,
                  },
                },
                {
                  active: true,
                },
              ],
                
            },
          });
          
          const isConnected = await authenticationService.checkPassword(user, password); 
          if(isConnected){
            const token = await authenticationService.createTokenJWT({
              'email': user.email,
              'identifier': user.identifier,
              'roles' : process.env.ADMIN_EMAILS.includes(user.email) ? ['ROLE_USER','ROLE_ADMIN'] : ['ROLE_USER']
            });
            res.status(200).json(token);
          }
          else {
            res.status(404).json({ error: "User not found" });
          }
          
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
    getMyInformations: async (req, res) => {
      res.status(200).json({user: req.user});
    },
};


module.exports = authenticationController;