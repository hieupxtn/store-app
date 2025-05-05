import db from '../models/index';

let getAll = async (req, res) => {
    try {
        let types = await db.ProductType.findAll();
        return res.status(200).json({ types });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let create = async (req, res) => {
    try {
        let type = await db.ProductType.create(req.body);
        return res.status(201).json({ type });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let update = async (req, res) => {
    try {
        let type = await db.ProductType.findByPk(req.params.id);
        if (!type) return res.status(404).json({ message: 'Type not found' });
        await type.update(req.body);
        return res.status(200).json({ type });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let remove = async (req, res) => {
    try {
        let type = await db.ProductType.findByPk(req.params.id);
        if (!type) return res.status(404).json({ message: 'Type not found' });
        await type.destroy();
        return res.status(204).send();
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = { getAll, create, update, remove }; 