const express = require("express");
const helmet = require("helmet")
const rateLimitMiddleware = require("./middlewares/ratelimit");
const app = express();
const port = 3000;

// import des routes
const categoryRoutes = require('./routes/CategoryRoutes');

app.use(helmet())
app.use(express.json());
app.use(rateLimitMiddleware);
app.use('/categories', categoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});