import db from '../models/index';

let create = async (req, res) => {
    try {
        let order = await db.Order.create(req.body, { include: db.OrderItem });
        return res.status(201).json({ order });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let getAll = async (req, res) => {
    try {
        let orders = await db.Order.findAll({ include: db.OrderItem });
        return res.status(200).json({ orders });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let getById = async (req, res) => {
    try {
        let order = await db.Order.findByPk(req.params.id, { include: db.OrderItem });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        return res.status(200).json({ order });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let update = async (req, res) => {
    try {
        let order = await db.Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        await order.update(req.body);
        return res.status(200).json({ order });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let remove = async (req, res) => {
    try {
        let order = await db.Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        await order.destroy();
        return res.status(204).send();
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = { create, getAll, getById, update, remove }; 