const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authenticationController = require("../controllers/AuthenticationController");



router.get("/users", authenticationController.getAll);


router.post("/register", 
    [
        body("name").isString().notEmpty(),
        body("password").isString().notEmpty(),
        body("email").isEmail().notEmpty(),
    ],
    authenticationController.register);

router.post("/login", authenticationController.login);



module.exports = router;