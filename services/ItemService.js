const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class CategoryService {

    /**
     * Compares the item data from the database with that passed as a parameter
     *  [ RETURN ARRAY ]
     * @param {number} itemId
     * @param {[]} fieldData
     */
    async compareDataForUpdate(itemId, fieldData){

        const databaseData = await prisma.item.findUniqueOrThrow({
            where: {
              id: itemId,
            },
          });

        
        const response = {
            "wording" : databaseData.wording,
            "categoryId" : databaseData.categoryId
        };
        
        if("wording" in fieldData && (databaseData.wording !== fieldData["wording"])){
            response["wording"] = fieldData["wording"];
        }

        if("categoryId" in fieldData && (databaseData.categoryId !== fieldData["categoryId"])){
            response["categoryId"] = fieldData["categoryId"];
        }
       
        return response;
    }

    /**
     * Returns the default category id
     * [RETURN INT]
     */

    async getIdDefaultCategory(){
        const defaultCategory = await prisma.categoryItem.findFirst({
            where: {
                wording: "Autres"
            }
        });
        return defaultCategory.id;
    }
}

module.exports = CategoryService;