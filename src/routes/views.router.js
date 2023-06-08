import { Router } from "express";
import { ProductManager } from "../managers/productManager.js";
const router = Router();

router.get('/',async (req,res)=>{
    const productManager = new ProductManager('./src/data/products.json');
    const products = await productManager.getProducts();
    res.render('home', {title: 'Flowery 4107 Products', style: 'product.css', products: products});
})

router.get('/realtimeproducts', (req,res)=>{
    res.render('realTimeProducts', {title: 'Flowery 4107 Products', style: 'productList.css'});
})

export default router;