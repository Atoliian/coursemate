"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("category_item", [
        {
          id: 1,
          wording: "Vêtements pour hommes",
          color: "#336699",
          created_at: new Date()
        },
        {
          id: 2,
          wording: "Vêtements pour femmes",
          color: "#FF3366",
          created_at: new Date()
        },
        {
          id: 3,
          wording: "Chaussures",
          color: "#996633",
          created_at: new Date()
        },
        {
          id: 4,
          wording: "Accessoires de mode",
          color: "#FF9900",
          created_at: new Date()
        },
        {
          id: 5,
          wording: "Électronique",
          color: "#99CC00",
          created_at: new Date()
        },
        {
          id: 6,
          wording: "Jouets",
          color: "#FFCC33",
          created_at: new Date()
        },
        {
          id: 7,
          wording: "Produits de beauté",
          color: "#CC3399",
          created_at: new Date()
        },
        {
          id: 8,
          wording: "Meubles",
          color: "#663366",
          created_at: new Date()
        },
        {
          id: 9,
          wording: "Articles de cuisine",
          color: "#FF6666",
          created_at: new Date()
        },
        {
          id: 10,
          wording: "Sports et loisirs",
          color: "#0099CC",
          created_at: new Date()
        },
        {
          id: 11,
          wording: "Livres et magazines",
          color: "#FF6600",
          created_at: new Date()
        },
        {
          id: 12,
          wording: "Musique et films",
          color: "#669933",
          created_at: new Date()
        },
        {
          id: 13,
          wording: "Articles pour bébés",
          color: "#FFCC66",
          created_at: new Date()
        },
        {
          id: 14,
          wording: "Produits de santé",
          color: "#993366",
          created_at: new Date()
        },
        {
          id: 15,
          wording: "Articles de bureau",
          color: "#3366CC",
          created_at: new Date()
        },
        {
          id: 16,
          wording: "Instruments de musique",
          color: "#FF3366",
          created_at: new Date()
        },
        {
          id: 17,
          wording: "Produits de jardinage",
          color: "#669966",
          created_at: new Date()
        },
        {
          id: 18,
          wording: "Produits alimentaires",
          color: "#CC0033",
          created_at: new Date()
        },
        {
          id: 19,
          wording: "Articles de voyage",
          color: "#FF9933",
          created_at: new Date()
        },
        {
          id: 20,
          wording: "Produits écologiques",
          color: "#66CC66",
          created_at: new Date()
        },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete("People", null, {});
     */
  }
};
