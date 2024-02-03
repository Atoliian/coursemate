const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const DefaultService = require("../services/DefaultService");
const defaultService = new DefaultService();

const { validationResult, check } = require("express-validator");

const itemController = {
  getAll: async (req, res) => {
    try {
      const currentPage = parseInt(req.query.page) || 1;
      const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
      const categories = req.query.categories;
      const keyword = req.query.wording;
      const query = ((Array.isArray(categories)&& categories.length > 0) || keyword)
        ? await prisma.item.findMany({
          where: {
            AND: [
              {
                wording: {
                  contains: keyword,
                },
              },
              {
                categoryId: {
                  in: categories.map(category => parseInt(category, 10)),
                },
              },
            ],
          },
        })
        : await prisma.item.findMany();

      const items = await defaultService.paginate(
        query,
        "items",
        currentPage,
        itemsPerPage
      );
      res.status(200).json(items);
    } catch (error) {
      console.error("Error retrieving items :", error);
      res.status(500).json({ error: "Error server" });
    }
  },
  getById: async (req, res) => {
    try {
      const itemId = parseInt(req.params.id);
      const item = await prisma.item.findUniqueOrThrow({
        where: {
          id: itemId,
        },
      });
      res.status(200).json(item);
    } catch (error) {
      console.error("Error retrieving items :", error);
      res.status(500).json({ error: "Error server" });
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
  update: (req, res) => {
    // Logique pour mettre à jour une catégorie spécifique par ID
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
module.exports = itemController;
