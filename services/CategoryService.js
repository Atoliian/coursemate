const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class CategoryService {

    /**
     * Compares the category data from the database with that passed as a parameter
     *  [ RETURN array ]
     * @param {number} categoryId
     * @param {[]} fieldData
     */
    async compareDataForUpdate(categoryId, fieldData){

        const databaseData = await prisma.categoryItem.findUniqueOrThrow({
            where: {
              id: categoryId,
            },
          });

        
        const response = {
            "wording" : databaseData.wording,
            "color" : databaseData.color
        };
        
        if("wording" in fieldData && (databaseData.wording !== fieldData["wording"])){
            response["wording"] = fieldData["wording"];
        }
        if("color" in fieldData && (databaseData.color !== fieldData["wording"])){
            response["color"] = fieldData["color"];
        }

        return response;
    }
}

module.exports = CategoryService;