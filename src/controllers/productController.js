import db from '../models/index';

let getAll = async (req, res) => {
    try {
        let products = await db.Product.findAll();
        return res.status(200).json({ products });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let getById = async (req, res) => {
    try {
        let product = await db.Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        return res.status(200).json({ product });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let create = async (req, res) => {
    try {
        let product = await db.Product.create(req.body);
        return res.status(201).json({ product });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let update = async (req, res) => {
    try {
        let product = await db.Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        await product.update(req.body);
        return res.status(200).json({ product });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let remove = async (req, res) => {
    try {
        let product = await db.Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        await product.destroy();
        return res.status(204).send();
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let getFeatured = async (req, res) => {
    try {
        let products = await db.Product.findAll({ where: { rating: { [db.Sequelize.Op.gte]: 4 } }, limit: 10 });
        return res.status(200).json({ products });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = { getAll, getById, create, update, remove, getFeatured }; 