const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const DefaultService = require("../services/DefaultService");
const CategoryService = require("../services/CategoryService");
const { v4: uuidv4 } = require('uuid');
const defaultService = new DefaultService();
const categoryService = new CategoryService();

const { validationResult, check } = require("express-validator");


const bracketController = {
  getAll: async (req, res) => {
    try {
      const currentPage = parseInt(req.query.page) || 1;
      const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
      const query = await prisma.bracket.findMany({
        where: {
          ownerId: req.user.id,
        },
      });

      const brackets = await defaultService.paginate(
        query,
        "brackets",
        currentPage,
        itemsPerPage
      );
      res.status(200).json(brackets);
    } catch (error) {
      console.error("Error retrieving categories :", error);
      res.status(500).json({ error: "Error server" });
    }
  },
  create: async (req, res) => {
    try {
      const {expiredAt, ownerId, name, color} = req.body;
      const newBracket = await prisma.bracket.create({
        data: {
          name,
          ownerId,
          expiredAt,
          color
        },
      });
      res.status(201).json(newBracket);
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
      const bracketId = parseInt(req.params.id);
      const bracket = await prisma.bracket.delete({
        where: {
          id: bracketId,
        },
      });
      res.status(201).json("Deletion successfull");
    } catch (error) {
      console.error("Error retrieving bracket :", error);
      res.status(500).json({ error: "Error server" });
    }
  },
  addItem: async (req, res) => {
    try {
      const bracketId = parseInt(req.params.id);
      const {entity, wording, category} = req.body;
      const bracket = await prisma.bracket.findUniqueOrThrow({
        where: {
          id: bracketId,
        },
      });
      if(req.user.id == bracket.ownerId){
        const existingItems = bracket.items || [];
        const newItem = {
          id: uuidv4(),
          entity: entity,
          wording: wording,
          category: { wording: category.wording, color: category.color }
        };
        existingItems.push(newItem);
        const updatedBracket = await prisma.bracket.update({
          where: { id: bracketId }, 
          data: { items: existingItems }
        });
        res.status(200).json(updatedBracket);
      }
    } catch (error) {
      console.error("Error retrieving bracket :", error);
      res.status(404).json({ error: "Bracket not found" });
    }
  },
  removeItem: async (req, res) => {
    try {
      const bracketId = parseInt(req.params.id);
      const {id} = req.body;
      const bracket = await prisma.bracket.findUniqueOrThrow({
        where: {
          id: bracketId,
        },
      });
      if(req.user.id == bracket.ownerId){
        const existingItems = bracket.items || [];
        if(existingItems.length > 0){
          const itemToDelete = existingItems.find(item => item.id === id);
          if(itemToDelete){
            const indexToDelete = existingItems.indexOf(itemToDelete);
            console.log(indexToDelete);
            existingItems.splice(indexToDelete, 1);
            const updatedBracket = await prisma.bracket.update({
              where: { id: bracketId }, 
              data: { items: existingItems }
            });
            res.status(200).json(updatedBracket);
          }
        }
      }
    } catch (error) {
      console.error("Error retrieving bracket :", error);
      res.status(404).json({ error: "Bracket not found" });
    }
  },
};
module.exports = bracketController;
