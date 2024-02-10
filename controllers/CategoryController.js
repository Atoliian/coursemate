const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const DefaultService = require("../services/DefaultService");
const CategoryService = require("../services/CategoryService");
const defaultService = new DefaultService();
const categoryService = new CategoryService();

const { validationResult, check } = require("express-validator");


const categoryController = {
  getAll: async (req, res) => {
    try {
      const currentPage = parseInt(req.query.page) || 1;
      const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
      const keyword = req.query.search;
      const query = keyword
        ? await prisma.categoryItem.findMany({
          where: {
            wording: {
              contains: keyword,
            },
          },
        })
        : await prisma.categoryItem.findMany();

      const categories = await defaultService.paginate(
        query,
        "categories",
        currentPage,
        itemsPerPage
      );
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error retrieving categories :", error);
      res.status(500).json({ error: "Error server" });
    }
  },
  getById: async (req, res) => {
    try {
      const categoryId = parseInt(req.params.id);
      const category = await prisma.categoryItem.findUniqueOrThrow({
        where: {
          id: categoryId,
        },
      });
      res.status(200).json(category);
    } catch (error) {
      console.error("Error retrieving categories :", error);
      res.status(404).json({ error: "Category not found" });
    }
  },
  create: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { wording, color } = req.body;

      const newCategory = await prisma.categoryItem.create({
        data: {
          wording,
          color,
        },
      });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  update: async (req, res) => {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const categoryId = parseInt(req.params.id);
      let { wording, color } = req.body;
      const updatedData =  await categoryService.compareDataForUpdate(categoryId, {"wording": wording, "color": color});
      wording = updatedData["wording"];
      color = updatedData["color"];

      console.log(wording, color);

      const categoryUpdated = await prisma.categoryItem.update({
        where: {
          id: categoryId,
        },
        data: {
          wording,
          color,
        },
      });
      res.status(201).json(categoryUpdated);
       
    }catch (error) {
      console.error("Error retrieving categories :", error);
      res.status(500).json({ error: "Error server" });
    }
  },
  remove: async (req, res) => {
    try {
      const categoryId = parseInt(req.params.id);
      const category = await prisma.categoryItem.delete({
        where: {
          id: categoryId,
        },
      });
      res.status(201).json("Deletion successfull");
    } catch (error) {
      console.error("Error retrieving categories :", error);
      res.status(500).json({ error: "Error server" });
    }
  },
};
module.exports = categoryController;
