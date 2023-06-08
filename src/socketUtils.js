import { ProductManager } from './managers/productManager.js'

const productsUpdated = async (io) => {
    const productManager = new ProductManager('./src/data/products.json');
    const products = await productManager.getProducts();
    io.emit('productsUpdated', products);    
};

export { productsUpdated };