import { Router } from "express";
import { CartManager } from "../managers/cartManager.js";

const cartManager = new CartManager('./src/data/carts.json');

const router = Router();

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).send({status: 1, msg: 'Cart added successfully', id: newCart.id});
    } catch (error) {
        res.status(500).send({status: 0, msg: error.message});
    }
});

router.get('/:cartId', async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const cart = await cartManager.getCart(cartId);
      res.json({status: 1, cartProducts: cart.products});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/:cartId/products/:productId', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId;
        const cart = await cartManager.addToCart(cartId, productId);
        res.status(201).send({status: 1, msg: 'Product added to cart successfully', cart});
    } catch (error) {
        res.status(500).send({status: 0, msg: error.message});
    }
});

export default router;
