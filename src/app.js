// Importa módulos necesarios
import express from 'express';
import mongoose from 'mongoose';
import config from './config.js';

// Importa routers
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

// Inicializa la aplicación Express
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos MongoDB
mongoose.connect(config.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Registro de routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Inicia el servidor
const PORT = config.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});
