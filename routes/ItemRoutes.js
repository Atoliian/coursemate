const express = require("express");
const itemController = require("../controllers/ItemController");

const router = express.Router();
const { body } = require("express-validator");

const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", authenticateToken, itemController.getAll);
router.get("/:id", authenticateToken, itemController.getById);
router.post(
  "/",
  authenticateToken,
  [
    body("wording").isString().notEmpty(),
    body("categoryId").optional().isNumeric(),
  ],
  itemController.create
);
router.put("/:id", 
  authenticateToken,
  [
    body("wording").optional().isString(),
    body("color").optional().isHexColor(),
  ],
  itemController.update);
router.delete("/:id", authenticateToken, itemController.remove);

module.exports = router;