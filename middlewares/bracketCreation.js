const jwt = require('jsonwebtoken');

function bracketCreation(req, res, next) {
   
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    req.body.expiredAt = currentDate;
    req.body.ownerId = req.user.id

    const red = Math.floor(Math.random() * 256); // Valeur aléatoire entre 0 et 255
    const green = Math.floor(Math.random() * 256); // Valeur aléatoire entre 0 et 255
    const blue = Math.floor(Math.random() * 256); // Valeur aléatoire entre 0 et 255

    // Convertir les valeurs RVB en une chaîne hexadécimale
    const colorHex = "#" + red.toString(16).padStart(2, '0') + green.toString(16).padStart(2, '0') + blue.toString(16).padStart(2, '0');

    req.body.color = colorHex;

    next();
}


module.exports = bracketCreation;