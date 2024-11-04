import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Definimos el esquema del producto con los campos necesarios
const schema = new mongoose.Schema({
    // Campo `name` de tipo String, requerido (obligatorio)
    name: { type: String, required: true },
    
    // Campo `category` de tipo String, opcional
    category: { type: String },
    
    // Campo `price` de tipo Number, requerido (obligatorio)
    price: { type: Number, required: true },
    
    // Campo `available` de tipo Boolean con un valor por defecto de `true`
    available: { type: Boolean, default: true }
});

// Agregamos el plugin de paginación a nuestro esquema
schema.plugin(mongoosePaginate);

// Exportamos el modelo de Mongoose para poder usarlo en otras partes del proyecto
// Este modelo se conectará con la colección `products` en la base de datos
export default mongoose.model('products', schema);
