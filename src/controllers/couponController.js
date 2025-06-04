import db from '../models/index';

let getAll = async (req, res) => {
    try {
        let coupons = await db.Coupon.findAll();
        return res.status(200).json({ coupons });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let create = async (req, res) => {
    try {
        let coupon = await db.Coupon.create(req.body);
        return res.status(201).json({ coupon });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let update = async (req, res) => {
    try {
        let coupon = await db.Coupon.findByPk(req.params.id);
        if (!coupon) return res.status(404).json({ message: 'Không tìm thấy mã giảm giá' });
        await coupon.update(req.body);
        return res.status(200).json({ coupon });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let remove = async (req, res) => {
    try {
        let coupon = await db.Coupon.findByPk(req.params.id);
        if (!coupon) return res.status(404).json({ message: 'Không tìm thấy mã giảm giá' });
        await coupon.destroy();
        return res.status(204).send();
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let applyCoupon = async (req, res) => {
    try {
        let { code } = req.body;
        let coupon = await db.Coupon.findOne({ where: { code } });
        if (!coupon) return res.status(404).json({ message: 'Không tìm thấy mã giảm giá' });
        // Có thể kiểm tra hạn sử dụng ở đây
        return res.status(200).json({ coupon });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = { getAll, create, update, remove, applyCoupon }; 