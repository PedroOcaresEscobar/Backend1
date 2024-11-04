import { Router } from 'express';
import ProductController from '../dao/products.controller.js';

const router = Router();
const controller = new ProductController();

// Ruta para obtener productos con paginación
router.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query; // Parámetros para paginación, orden y filtro
    try {
        const products = await controller.getAllProducts(limit, page, sort, query);
        res.status(200).json(products); // Respuesta con productos obtenidos
    } catch (error) {
        res.status(500).json({ error: error.message }); // Respuesta en caso de error en la consulta
    }
});

// Ruta para obtener un producto específico por su ID
router.get('/:id', async (req, res) => {
    const { id } = req.params; // Obtiene el ID del producto de los parámetros de la ruta
    try {
        const product = await controller.getProductById(id);
        if (product) {
            res.status(200).json(product); // Responde con el producto encontrado
        } else {
            res.status(404).json({ message: "Producto no encontrado" }); // Mensaje en caso de que no se encuentre el producto
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Error en caso de fallo en la búsqueda
    }
});

// Ruta para actualizar un producto por su ID
router.put('/:id', async (req, res) => {
    const { id } = req.params; // ID del producto que se desea actualizar
    const updateData = req.body; // Datos de actualización enviados en el cuerpo de la solicitud
    try {
        const updatedProduct = await controller.updateProductById(id, updateData);
        if (updatedProduct) {
            res.status(200).json(updatedProduct); // Responde con el producto actualizado
        } else {
            res.status(404).json({ message: "Producto no encontrado" }); // Mensaje si el producto no existe
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Error en caso de fallo en la actualización
    }
});

// Ruta para eliminar un producto por su ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // ID del producto a eliminar
    try {
        const deletedProduct = await controller.deleteProductById(id);
        if (deletedProduct) {
            res.status(200).json({ message: "Producto eliminado exitosamente", product: deletedProduct }); // Respuesta en caso de éxito
        } else {
            res.status(404).json({ message: "Producto no encontrado" }); // Mensaje si no existe el producto
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Error en caso de fallo en la eliminación
    }
});

export default router;
