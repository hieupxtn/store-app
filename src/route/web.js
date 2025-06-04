import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import productController from '../controllers/productController';
import typeproductController from '../controllers/typeproductController';
import orderController from '../controllers/orderController';
import shoppingcartController from '../controllers/shoppingcartController';
import couponController from '../controllers/couponController';
import reviewController from '../controllers/reviewController';
import adminController from '../controllers/adminController';
import brandController from '../controllers/brandController';
import paymentController from '../controllers/paymentController';
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
    router.get('/api/users/:userId/orders', orderController.getByUserId);
    router.put('/api/orders/:id', orderController.update);
    router.delete('/api/orders/:id', orderController.remove);
    router.patch('/api/orders/:orderId/status', orderController.updateStatus);
    router.get('/api/cart', authenticateJWT, shoppingcartController.getCart);
    router.post('/api/cart', authenticateJWT, shoppingcartController.addToCart);
    router.put('/api/cart/:itemId', authenticateJWT, shoppingcartController.updateCartItem);
    router.delete('/api/cart/:itemId', authenticateJWT, shoppingcartController.removeCartItem);
    router.delete('/api/carts', authenticateJWT, shoppingcartController.removeMultipleItems);
    router.get('/api/coupons', couponController.getAll);
    router.post('/api/coupons', couponController.create);
    router.put('/api/coupons/:id', couponController.update);
    router.delete('/api/coupons/:id', couponController.remove);
    router.post('/api/coupons/apply', couponController.applyCoupon);
    router.post('/api/reviews', reviewController.create);
    router.get('/api/reviews/:productId', reviewController.getByProduct);
    router.post('/api/logout', userController.logout);
    router.get('/api/best-sellers', productController.getBestSellers);
    router.get('/api/new-products', productController.getNewProducts);
    router.get('/api/products/:id/related', productController.getRelatedProducts);
    router.get('/api/admin/dashboard-statistics', adminController.dashboardStatistics);

    // Brand routes
    router.get('/api/brands', brandController.getAllBrands);
    router.get('/api/brands/:id', brandController.getBrandById);
    router.post('/api/brands', authenticateJWT, isAdmin, brandController.createBrand);
    router.put('/api/brands/:id', authenticateJWT, isAdmin, brandController.updateBrand);
    router.delete('/api/brands/:id', authenticateJWT, isAdmin, brandController.deleteBrand);

    // Payment route
    router.post('/api/payment/process', paymentController.processPayment);

    return app.use("/", router);
}

module.exports = initWebRoutes;