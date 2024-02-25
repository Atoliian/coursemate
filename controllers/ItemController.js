const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const DefaultService = require("../services/DefaultService");
const defaultService = new DefaultService();
const ItemService = require("../services/ItemService");
const itemService = new ItemService();

const { validationResult, check } = require("express-validator");

const itemController = {
  getAll: async (req, res) => {
    try {
      const currentPage = parseInt(req.query.page) || 1;
      const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
      const categories = req.query.categories;
      const keyword = req.query.wording;
      let query = ((Array.isArray(categories)&& categories.length > 0) && keyword)
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
        :  keyword ? 
        await prisma.item.findMany({
          where: {
            wording: {
              contains: keyword,
            },
          },
        })
        : (Array.isArray(categories)&& categories.length > 0) ?
        await prisma.item.findMany({
          where: {
            categoryId: {
              in: categories.map(category => parseInt(category, 10)),
            },
          },
        })
        : await prisma.item.findMany();

      query = await itemService.serializeItem(query);

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
      let item = await prisma.item.findUniqueOrThrow({
        where: {
          id: itemId,
        },
      });

      item = await itemService.serializeItem(item);

      res.status(200).json(item);
    } catch (error) {
      console.error("Error retrieving items :", error);
      res.status(404).json({ error: "Item not found" });
    }
  },
  create: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      var { wording, categoryId } = req.body;
      const createdAt = new Date();

      if(!categoryId){
        categoryId = await itemService.getIdDefaultCategory();
      }


      const newItem = await prisma.item.create({
        data: {
          wording,
          categoryId,
          createdAt
        },
      });
      res.status(201).json(newItem);
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

      const itemId = parseInt(req.params.id);
      let { wording, categoryId } = req.body;
      const updatedData =  await itemService.compareDataForUpdate(itemId, {"wording": wording, "categoryId": categoryId});
      wording = updatedData["wording"];
      categoryId = updatedData["categoryId"];

      const itemUpdated = await prisma.item.update({
        where: {
          id: itemId,
        },
        data: {
          wording,
          categoryId
        },
      });
      res.status(201).json(itemUpdated);
       
    }catch (error) {
      console.error("Error retrieving items :", error);
      res.status(500).json({ error: "Error server" });
    }
  },
  remove: async (req, res) => {
    try {
      const itemId = parseInt(req.params.id);
      const item = await prisma.item.delete({
        where: {
          id: itemId,
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
