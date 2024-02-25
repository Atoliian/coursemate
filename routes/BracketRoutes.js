const express = require("express");
const bracketController = require("../controllers/BracketController");

const router = express.Router();
const { body } = require("express-validator");

const authenticateToken = require("../middlewares/authenticateToken");
const bracketCreation = require("../middlewares/bracketCreation");

router.get("/", authenticateToken, bracketController.getAll);
router.post(
  "/",
  authenticateToken,
  bracketCreation,
  [
    body("wording").isString().notEmpty(),
    body("color").optional().isHexColor(),
  ],
  bracketController.create
);

router.delete("/:id", authenticateToken, bracketController.remove);

router.put("/addItem/:id", authenticateToken, bracketController.addItem);
router.put("/removeItem/:id", authenticateToken, bracketController.removeItem);

module.exports = router;
