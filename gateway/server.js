import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ Autorise les requêtes du frontend React (port 3000)
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());



// ✅ Route manuelle vers order-service
app.post('/api/orders', async (req, res) => {
  try {
    const response = await axios.post('http://order-service:5003/orders', req.body, {
      headers: { 'Content-Type': 'application/json' }
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Erreur vers order-service :', err.message);
    res.status(500).json({ error: 'Erreur lors de la requête vers order-service' });
  }
});

// ✅ Route manuelle vers menu-service
app.get('/api/menus/fake-menus', async (req, res) => {
  try {
    const response = await axios.get('http://menu-service:5004/fake-menus');
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Erreur vers menu-service :', err.message);
    res.status(500).json({ error: 'Erreur vers menu-service' });
  }
});
app.get('/api/orders/pending/:restaurant_id', async (req, res) => {
  try {
    const response = await axios.get(`http://order-service:5003/orders/pending/${req.params.restaurant_id}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erreur proxy vers order-service:', error.message);
    res.status(500).json({ error: 'Erreur proxy gateway' });
  }
});

// ✅ Route manuelle pour servir les images des menus
app.use('/api/menus/images', async (req, res) => {
  try {
    const imageUrl = `http://menu-service:5004/images${req.url}`;
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    response.data.pipe(res);
  } catch (err) {
    console.error('Erreur image menu :', err.message);
    res.status(404).send('Image non trouvée');
  }
});

// TODO: Ajouter ici d’autres routes manuelles (users, payments, etc.)

// ✅ Start the gateway
app.listen(PORT, () => {
  console.log(`🚀 Gateway running manually on port ${PORT}`);
});