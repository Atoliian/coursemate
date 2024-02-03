const express = require("express");
const categoryController = require("../controllers/CategoryController");

const router = express.Router();
const { body } = require("express-validator");

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.post(
  "/",
  [
    body("wording").isString().notEmpty(),
    body("color").optional().isHexColor(),
  ],
  categoryController.create
);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.remove);

module.exports = router;
