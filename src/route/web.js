import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import productController from '../controllers/productController';
import typeproductController from '../controllers/typeproductController';
import orderController from '../controllers/orderController';
import shoppingcartController from '../controllers/shoppingcartController';
import couponController from '../controllers/couponController';
import reviewController from '../controllers/reviewController';
import { authenticateJWT, isAdmin } from '../middleware/auth';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.post('/api/login', userController.login);
    router.get('/api/create-user', homeController.createUser);
    router.get('/api/get-all-users', homeController.getAllUsers);
    router.get('/api/get-featured-products', homeController.getFeaturedProducts);
    router.post('/api/register', userController.register);
    router.get('/api/users', userController.getAll);
    router.get('/api/users/:id', userController.getById);
    router.put('/api/users/:id', userController.update);
    router.delete('/api/users/:id', authenticateJWT, isAdmin, userController.remove);
    router.get('/api/products', productController.getAll);
    router.get('/api/products/:id', productController.getById);
    router.post('/api/products', productController.create);
    router.put('/api/products/:id', productController.update);
    router.delete('/api/products/:id', productController.remove);
    router.get('/api/featured-products', productController.getFeatured);
    router.get('/api/product-types', typeproductController.getAll);
    router.post('/api/product-types', typeproductController.create);
    router.put('/api/product-types/:id', typeproductController.update);
    router.delete('/api/product-types/:id', typeproductController.remove);
    router.post('/api/orders', orderController.create);
    router.get('/api/orders', orderController.getAll);
    router.get('/api/orders/:id', orderController.getById);
    router.put('/api/orders/:id', orderController.update);
    router.delete('/api/orders/:id', orderController.remove);
    router.get('/api/cart', shoppingcartController.getCart);
    router.post('/api/cart', shoppingcartController.addToCart);
    router.put('/api/cart/:itemId', shoppingcartController.updateCartItem);
    router.delete('/api/cart/:itemId', shoppingcartController.removeCartItem);
    router.get('/api/coupons', couponController.getAll);
    router.post('/api/coupons', couponController.create);
    router.put('/api/coupons/:id', couponController.update);
    router.delete('/api/coupons/:id', couponController.remove);
    router.post('/api/coupons/apply', couponController.applyCoupon);
    router.post('/api/reviews', reviewController.create);
    router.get('/api/reviews/:productId', reviewController.getByProduct);
    router.post('/api/logout', userController.logout);

    return app.use("/", router);
}

module.exports = initWebRoutes;