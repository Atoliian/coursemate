const express = require("express");
const helmet = require("helmet");
const rateLimitMiddleware = require("./middlewares/ratelimit");
const app = express();
const port = 3000;

// import des routes
const categoryRoutes = require("./routes/CategoryRoutes");
const itemRoutes = require("./routes/ItemRoutes");
const authRoutes = require('./routes/AuthenticationRoutes');

// import de la couche sécurité
app.use(helmet());
app.use(express.json());
app.use(rateLimitMiddleware);


// Déclaration des routes
app.use("/categories", categoryRoutes);
app.use("/items", itemRoutes);
app.use("/auth",authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
