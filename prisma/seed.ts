import { PrismaClient } from '@prisma/client'
const categoryItems = require('./json_data/categoryItem.seed.js')
const foods = require('./json_data/foodItem.seed.js')
const clothes = require('./json_data/clotheItem.seed.js')
const shoes = require('./json_data/shoesItem.seed.js')
const fashionAccessories = require('./json_data/fashionAccessoryItem.seed.js')
const prisma = new PrismaClient()




async function main() {
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS=0`;
    // import categoryItems
    await prisma.categoryItem.deleteMany();
    for (let i = 0; i < categoryItems.length; i++) {
        await prisma.categoryItem.create({
            data: {
                id: i+1,
                wording: categoryItems[i].wording,
                color: categoryItems[i].color
            }
        });
    }
    // import foods
    await prisma.item.deleteMany();
    for (let i = 0; i < foods.length; i++) {
        await prisma.item.create({
            data: {
                id: i+1,
                wording: foods[i].wording,
                categoryId: foods[i].categoryItem
            }
        });
    }
    // import clothes
    for (let i = 0; i < clothes.length; i++) {
        await prisma.item.create({
            data: {
                wording: clothes[i].wording,
                categoryId: clothes[i].categoryItem
            }
        });
    }
    // import shoes
    for (let i = 0; i < shoes.length; i++) {
        await prisma.item.create({
            data: {
                wording: shoes[i].wording,
                categoryId: shoes[i].categoryItem
            }
        });
    }
    // import fashionAccessories
    for (let i = 0; i < fashionAccessories.length; i++) {
        await prisma.item.create({
            data: {
                wording: fashionAccessories[i].wording,
                categoryId: fashionAccessories[i].categoryItem
            }
        });
    }
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS=1`;
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })