const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authenticationController = require("../controllers/AuthenticationController");
const authenticateToken = require("../middlewares/authenticateToken");



router.get("/users", authenticateToken, authenticationController.getAll);

router.get("/me",authenticateToken, authenticationController.getMyInformations);


router.post("/register", 
    [
        body("name").isString().notEmpty(),
        body("password").isString().notEmpty(),
        body("email").isEmail().notEmpty(),
    ],
    authenticationController.register);

router.post("/login", authenticationController.login);
router.post("/account/email/validation", authenticationController.emailValidation);



module.exports = router;