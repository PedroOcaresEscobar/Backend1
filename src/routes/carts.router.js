import { Router } from 'express';
import CartController from '../dao/carts.controller.js';

const router = Router(); // Creamos una instancia del enrutador de Express
const controller = new CartController(); // Instancia del controlador de carritos

// Ruta para obtener todos los carritos
router.get('/', async (req, res) => {
    try {
        const carts = await controller.getAllCarts(); // Obtiene todos los carritos desde el controlador
        res.status(200).json(carts); // Responde con el JSON de los carritos
    } catch (error) {
        res.status(500).json({ error: error.message }); // Muestra error si ocurre algún problema
    }
});

// Ruta para obtener un carrito específico por su ID
router.get('/:id', async (req, res) => {
    const { id } = req.params; // Extrae el ID de los parámetros de la URL
    try {
        const cart = await controller.getCartById(id); // Obtiene el carrito por ID
        if (cart) {
            res.status(200).json(cart); // Si se encuentra el carrito, responde con el JSON del carrito
        } else {
            res.status(404).json({ message: "Carrito no encontrado" }); // Si no se encuentra, responde con un mensaje de error
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Muestra error si ocurre algún problema
    }
});

// Ruta para agregar un producto al carrito
router.post('/:cartId/products/:productId', async (req, res) => {
    const { cartId, productId } = req.params; // Extrae el ID del carrito y del producto de los parámetros de la URL
    const { quantity } = req.body; // Extrae la cantidad del cuerpo de la solicitud
    try {
        const updatedCart = await controller.addProductToCart(cartId, productId, quantity); // Agrega el producto al carrito
        res.status(200).json(updatedCart); // Responde con el carrito actualizado
    } catch (error) {
        res.status(500).json({ error: error.message }); // Muestra error si ocurre algún problema
    }
});

// Ruta para actualizar la cantidad de un producto en el carrito
router.put('/:cartId/products/:productId', async (req, res) => {
    const { cartId, productId } = req.params; // Extrae el ID del carrito y del producto de los parámetros de la URL
    const { quantity } = req.body; // Extrae la cantidad del cuerpo de la solicitud

    try {
        const updatedCart = await controller.updateProductQuantity(cartId, productId, quantity); // Llama a la función que actualiza la cantidad
        if (updatedCart) {
            res.status(200).json(updatedCart); // Responde con el carrito actualizado
        } else {
            res.status(404).json({ message: "Carrito o producto no encontrado" }); // Mensaje de error si no se encuentra
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Muestra error si ocurre algún problema
    }
});

// Ruta para eliminar un producto del carrito
router.delete('/:cartId/products/:productId', async (req, res) => {
    const { cartId, productId } = req.params; // Extrae el ID del carrito y del producto de los parámetros de la URL
    try {
        const updatedCart = await controller.removeProductFromCart(cartId, productId); // Elimina el producto del carrito
        res.status(200).json(updatedCart); // Responde con el carrito actualizado
    } catch (error) {
        res.status(500).json({ error: error.message }); // Muestra error si ocurre algún problema
    }
});

// Ruta para vaciar el carrito
router.delete('/:cartId', async (req, res) => {
    const { cartId } = req.params; // Extrae el ID del carrito de los parámetros de la URL
    try {
        const clearedCart = await controller.clearCart(cartId); // Vacía el carrito
        res.status(200).json(clearedCart); // Responde con el carrito vaciado
    } catch (error) {
        res.status(500).json({ error: error.message }); // Muestra error si ocurre algún problema
    }
});

export default router;
