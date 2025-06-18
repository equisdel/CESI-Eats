const express = require('express');
const cors = require('cors');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());

// Sert les fichiers d'images statiques
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// 🔁 Connexion PostgreSQL (⚠️ Docker : host = 'postgres')
const sequelize = new Sequelize('cesi_global', 'user', 'password', {
  host: 'postgres',
  dialect: 'postgres',
});

// 📦 Modèle Restaurant
const Restaurant = sequelize.define('Restaurant', {
  restaurant_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: DataTypes.STRING,
}, {
  tableName: 'restaurant',
  timestamps: false,
});

// 📦 Modèle Menu
const Menu = sequelize.define('Menu', {
  menu_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  restaurant_id: DataTypes.STRING,
  price: DataTypes.FLOAT,
  photo: DataTypes.STRING,
}, {
  tableName: 'menu',
  timestamps: false,
});

// 🔗 Association
Menu.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

// 📥 Endpoint pour les menus simulés
app.get('/fake-menus', async (req, res) => {
  try {
    const menus = await Menu.findAll({
      include: {
        model: Restaurant,
        attributes: ['name'],
      },
    });
    res.json(menus);
  } catch (err) {
    console.error("Erreur dans /api/fake-menus :", err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ Démarrage du serveur (port 5010 pour éviter conflit avec Gateway)
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`✅ Mock Menus Service listening on http://localhost:${PORT}`);
});
