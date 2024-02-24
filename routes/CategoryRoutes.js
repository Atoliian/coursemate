const express = require("express");
const categoryController = require("../controllers/CategoryController");

const router = express.Router();
const { body } = require("express-validator");

const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", authenticateToken, categoryController.getAll);
router.get("/:id", authenticateToken, categoryController.getById);
router.post(
  "/",
  authenticateToken,
  [
    body("wording").isString().notEmpty(),
    body("color").optional().isHexColor(),
  ],
  categoryController.create
);
router.put("/:id",
  authenticateToken,
  [
    body("wording").optional().isString(),
    body("color").optional().isHexColor(),
  ],
  categoryController.update);
router.delete("/:id", authenticateToken, categoryController.remove);

module.exports = router;
