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
    body("categoryId").optional().isNumeric(),
  ],
  itemController.create
); // TODO : Rajouter une règle de sécurité pour cette route, que les admins
router.put("/:id", 
  [
    body("wording").optional().isString(),
    body("color").optional().isHexColor(),
  ],
  itemController.update); // TODO : Rajouter une règle de sécurité pour cette route, que les admins
router.delete("/:id", itemController.remove); // TODO : Rajouter une règle de sécurité pour cette route, que les admins

module.exports = router;