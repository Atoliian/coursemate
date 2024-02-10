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
); // TODO : Rajouter une règle de sécurité pour cette route, que les admins
router.put("/:id", 
  [
    body("wording").optional().isString(),
    body("color").optional().isHexColor(),
  ],
  categoryController.update); // TODO : Rajouter une règle de sécurité pour cette route, que les admins
router.delete("/:id", categoryController.remove); // TODO : Rajouter une règle de sécurité pour cette route, que les admins

module.exports = router;
