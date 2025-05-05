import db from '../models/index';

let create = async (req, res) => {
    try {
        let review = await db.Review.create(req.body);
        return res.status(201).json({ review });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let getByProduct = async (req, res) => {
    try {
        let reviews = await db.Review.findAll({ where: { productId: req.params.productId } });
        return res.status(200).json({ reviews });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = { create, getByProduct }; 