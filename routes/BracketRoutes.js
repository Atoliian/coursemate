const express = require("express");
const bracketController = require("../controllers/BracketController");

const router = express.Router();
const { body } = require("express-validator");

const authenticateToken = require("../middlewares/authenticateToken");
const bracketCreation = require("../middlewares/bracketCreation");

router.get("/", authenticateToken, bracketController.getAll);
router.get("/:id", authenticateToken, bracketController.getById);
router.post(
  "/",
  authenticateToken,
  bracketCreation,
  [
    body("name").isString().notEmpty(),
    body("color").optional().isHexColor(),
  ],
  bracketController.create
);

router.patch(
  "/:id",
  authenticateToken,
  [
    body("name").isString().notEmpty()
  ],
  bracketController.update
);

router.delete("/:id", authenticateToken, bracketController.remove);

router.put("/addItem/:id", authenticateToken, bracketController.addItem);
router.put("/removeItem/:id", authenticateToken, bracketController.removeItem);

module.exports = router;
