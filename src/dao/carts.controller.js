import cartModel from './models/cart.model.js';

class CartController {
    // Obtener todos los carritos
    async getAllCarts() {
        try {
            // Buscamos todos los carritos en la base de datos, poblamos la información de los productos y convertimos el resultado a un objeto JavaScript con "lean"
            return await cartModel.find().populate('products.product').lean();
        } catch (error) {
            // En caso de error, lo mostramos en la consola
            console.error("Error al obtener todos los carritos:", error.message);
            // Lanzamos una excepción con un mensaje de error
            throw new Error(`Error al obtener todos los carritos: ${error.message}`);
        }
    }

    // Obtener carrito por ID
    async getCartById(id) {
        try {
            // Buscamos un carrito específico por su ID, populamos los productos y convertimos el resultado a un objeto JavaScript con "lean"
            return await cartModel.findById(id).populate('products.product').lean();
        } catch (error) {
            // Lanzamos una excepción con un mensaje de error
            throw new Error("Error al obtener el carrito por ID");
        }
    }

    // Agregar producto al carrito
    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            // Actualizamos el carrito específico con el ID dado, agregando un nuevo producto y su cantidad
            return await cartModel.findByIdAndUpdate(
                cartId,
                { $push: { products: { product: productId, quantity } } }, // Usamos $push para añadir el producto
                { new: true, upsert: true } // new: devuelve el carrito actualizado; upsert: crea el carrito si no existe
            ).populate('products.product').lean();
        } catch (error) {
            // Lanzamos una excepción con un mensaje de error
            throw new Error("Error al agregar el producto al carrito");
        }
    }

    // Actualizar cantidad de un producto en el carrito
    async updateProductQuantity(cartId, productId, quantity) {
        try {
            // Buscamos el carrito y actualizamos la cantidad del producto
            const cart = await cartModel.findById(cartId);
            if (!cart) throw new Error("Carrito no encontrado");
    
            const productInCart = cart.products.find(p => p.product._id.toString() === productId);
            if (!productInCart) throw new Error("Producto no encontrado en el carrito");
    
            productInCart.quantity = quantity; // Actualiza la cantidad del producto
    
            await cart.save(); // Guarda los cambios en el carrito
            return cart; // Devuelve el carrito actualizado
        } catch (error) {
            throw new Error("Error al actualizar la cantidad del producto en el carrito");
        }
    }

    // Eliminar un producto del carrito
    async removeProductFromCart(cartId, productId) {
        try {
            const result = await cartModel.findByIdAndUpdate(
                cartId,
                { $pull: { products: { product: mongoose.Types.ObjectId(productId) } } }, // Conversión a ObjectId
                { new: true }
            ).populate('products.product').lean();
            
            return result;
        } catch (error) {
            throw new Error("Error al eliminar el producto del carrito: " + error.message);
        }
    }

    // Vaciar el carrito
    async clearCart(cartId) {
        try {
            // Buscamos el carrito por su ID y lo actualizamos para que la lista de productos esté vacía
            return await cartModel.findByIdAndUpdate(cartId, { products: [] }, { new: true }).lean();
        } catch (error) {
            // Lanzamos una excepción con un mensaje de error
            throw new Error("Error al vaciar el carrito");
        }
    }
}

export default CartController;
