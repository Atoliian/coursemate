const express = require("express");
const itemController = require("../controllers/ItemController");

const router = express.Router();
const { body } = require("express-validator");

router.get("/", itemController.getAll);
router.get("/:id", itemController.getById);
router.post(
  "/",
  [
    body("wording").isString().notEmpty(),
    body("color").optional().isHexColor(),
  ],
  itemController.create
);
router.put("/:id", itemController.update);
router.delete("/:id", itemController.remove);

module.exports = router;