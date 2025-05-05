import db from '../models/index';

let getCart = async (req, res) => {
    try {
        let userId = req.query.userId;
        let cart = await db.ShoppingCart.findAll({ where: { userId }, include: db.Product });
        return res.status(200).json({ cart });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let addToCart = async (req, res) => {
    try {
        let { userId, productId, quantity } = req.body;
        let item = await db.ShoppingCart.create({ userId, productId, quantity });
        return res.status(201).json({ item });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let updateCartItem = async (req, res) => {
    try {
        let item = await db.ShoppingCart.findByPk(req.params.itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        await item.update(req.body);
        return res.status(200).json({ item });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let removeCartItem = async (req, res) => {
    try {
        let item = await db.ShoppingCart.findByPk(req.params.itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        await item.destroy();
        return res.status(204).send();
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = { getCart, addToCart, updateCartItem, removeCartItem }; 