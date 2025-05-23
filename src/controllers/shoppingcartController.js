import db from '../models/index';
const ShoppingCart = db.ShoppingCart;
const Product = db.Product;
const { Op } = require('sequelize');

let getCart = async (req, res) => {
    try {
        // Get userId from authenticated user
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized - Please login' });
        }

        let cart = await db.ShoppingCart.findAll({ 
            where: { userId },
            include: [{
                model: db.Product,
                include: [
                    { model: db.ProductType },
                    { model: db.Brand }
                ]
            }]
        });
        return res.status(200).json({ cart });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized - Please login' });
        }

        const { productId, quantity } = req.body;
        
        // Validate product exists
        const product = await db.Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if product already in cart
        let cartItem = await db.ShoppingCart.findOne({
            where: { userId, productId }
        });

        if (cartItem) {
            // Update quantity if product already in cart
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Create new cart item
            cartItem = await db.ShoppingCart.create({
                userId,
                productId,
                quantity
            });
        }

        return res.status(201).json({ cartItem });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized - Please login' });
        }

        const { itemId } = req.params;
        const { quantity } = req.body;

        let cartItem = await db.ShoppingCart.findOne({
            where: { id: itemId, userId }
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        if (quantity <= 0) {
            await cartItem.destroy();
            return res.status(200).json({ message: 'Item removed from cart' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        return res.status(200).json({ cartItem });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let removeCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized - Please login' });
        }

        const { itemId } = req.params;
        
        let cartItem = await db.ShoppingCart.findOne({
            where: { id: itemId, userId }
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        await cartItem.destroy();
        return res.status(200).json({ message: 'Item removed from cart' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let removeMultipleItems = async (req, res) => {
    try {
        const { userId, itemIds } = req.body;

        // Validate input
        if (!userId) {
            return res.status(400).json({
                message: 'User ID is required'
            });
        }

        if (!Array.isArray(itemIds) || itemIds.length === 0) {
            return res.status(400).json({
                message: 'Item IDs must be a non-empty array'
            });
        }

        // Check if all items exist and belong to the user
        const items = await ShoppingCart.findAll({
            where: {
                id: {
                    [Op.in]: itemIds
                },
                userId: userId
            }
        });

        if (items.length !== itemIds.length) {
            const foundIds = items.map(item => item.id);
            const missingIds = itemIds.filter(id => !foundIds.includes(id));
            return res.status(404).json({
                message: 'Some items not found or do not belong to the user',
                missingItemIds: missingIds
            });
        }

        // Delete items
        await ShoppingCart.destroy({
            where: {
                id: {
                    [Op.in]: itemIds
                },
                userId: userId
            }
        });

        return res.status(200).json({
            message: 'Items removed from cart successfully',
            removedItems: itemIds
        });

    } catch (error) {
        console.error('Error removing items from cart:', error);
        return res.status(500).json({
            message: 'Error removing items from cart',
            error: error.message
        });
    }
};

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, removeMultipleItems }; 