const express = require("express");
const helmet = require("helmet");
const rateLimitMiddleware = require("./middlewares/ratelimit");
const crontab = require("./crontab");
const app = express();
const port = 3000;
require('@babel/register')({
  presets: ['@babel/preset-react']
});

// import des routes
const categoryRoutes = require("./routes/CategoryRoutes");
const itemRoutes = require("./routes/ItemRoutes");
const authRoutes = require('./routes/AuthenticationRoutes');
const bracketRoutes = require('./routes/BracketRoutes');

// import de la couche sécurité
app.use(helmet());
app.use(express.json());
app.use(rateLimitMiddleware);


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Remplacez ceci par le domaine de votre application frontale
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// Déclaration des routes
app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/brackets", bracketRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
