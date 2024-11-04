import mongoose from 'mongoose';

// Definimos el esquema para el carrito de compras
const cartSchema = new mongoose.Schema({
    // Array de productos en el carrito
    products: [
        {
            // Campo `product` que almacena el ID de un producto, referenciando al modelo de productos
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            
            // Campo `quantity` para almacenar la cantidad de este producto en el carrito. Valor por defecto: 1
            quantity: { type: Number, default: 1 }
        }
    ]
});

// Exportamos el modelo de Mongoose para poder usarlo en otras partes del proyecto
// Este modelo se conectará con la colección `carts` en la base de datos
export default mongoose.model('carts', cartSchema);
