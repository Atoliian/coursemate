const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ItemService {

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

    async serializeItem(items) {
        const serializedItems = [];
        if(Array.isArray(items)){
            for (const item of items) {
                try {
                    // Récupérer la catégorie correspondante à l'item
                    const category = await prisma.categoryItem.findUnique({
                        where: {
                            id: item.categoryId // Supposons que categoryId soit le champ qui lie les items aux catégories
                        }
                    });
        
                    // Vérifier si la catégorie existe
                    if (category) {
                        // Ajouter les champs de la catégorie à l'item
                        item.category = {
                            wording: category.wording,
                            color: category.color
                        };
                    }
        
                    // Ajouter l'item traité à la liste des items sérialisés
                    serializedItems.push(item);
                } catch (error) {
                    console.error(`Erreur lors de la sérialisation de l'item ${item.id}: ${error}`);
                }
            }
            return serializedItems;
        } 
        let item = items;
        try {
            // Récupérer la catégorie correspondante à l'item
            const category = await prisma.categoryItem.findUnique({
                where: {
                    id: item.categoryId // Supposons que categoryId soit le champ qui lie les items aux catégories
                }
            });
            
            // Vérifier si la catégorie existe
            if (category) {
                // Ajouter les champs de la catégorie à l'item
                item.category = {
                    wording: category.wording,
                    color: category.color
                };
            }

            return item;
        } catch (error) {
            console.error(`Erreur lors de la sérialisation de l'item ${item.id}: ${error}`);
        }
    }
}

module.exports = ItemService;