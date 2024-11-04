import productModel from './models/product.model.js';

class ProductController {
    // Obtener todos los productos con paginación
    async getAllProducts(limit = 10, page = 1, sort, query) {
        try {
            // Configuramos las opciones para la paginación y ordenamiento
            const options = {
                limit: parseInt(limit), // Límite de productos por página
                page: parseInt(page), // Página actual
                sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined, // Orden ascendente o descendente por precio
                lean: true, // Convierte el resultado en un objeto JavaScript simple
            };

            // Si se proporciona un `query`, filtramos los productos por categoría
            const filter = query ? { category: query } : {};

            // Utilizamos `paginate` para obtener los productos con los filtros y opciones configurados
            return await productModel.paginate(filter, options);
        } catch (error) {
            // Si ocurre un error, lanzamos una excepción con un mensaje en español
            throw new Error("Error al obtener productos con filtros y paginación");
        }
    }

    // Obtener un producto por ID
    async getProductById(id) {
        try {
            // Buscamos el producto específico por su ID y lo convertimos a un objeto JavaScript con `lean`
            return await productModel.findById(id).lean();
        } catch (error) {
            // Si ocurre un error, lanzamos una excepción con un mensaje en español
            throw new Error("Error al obtener el producto por ID");
        }
    }

    // Actualizar un producto por ID
    async updateProductById(id, updateData) {
        try {
            // Buscamos el producto por su ID y aplicamos los cambios proporcionados en `updateData`
            return await productModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
            // `new: true` hace que se devuelva el producto actualizado
        } catch (error) {
            // Si ocurre un error, lanzamos una excepción con un mensaje en español
            throw new Error("Error al actualizar el producto");
        }
    }

    // Eliminar un producto por ID
    async deleteProductById(id) {
        try {
            // Buscamos el producto por su ID y lo eliminamos
            return await productModel.findByIdAndDelete(id);
        } catch (error) {
            // Si ocurre un error, lanzamos una excepción con un mensaje en español
            throw new Error("Error al eliminar el producto");
        }
    }
}

export default ProductController;
