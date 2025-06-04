import db from '../models/index';

let verifyPurchase = async (userId, productId) => {
    try {
        const order = await db.Order.findOne({
            include: [{
                model: db.OrderItem,
                where: { productId: productId }
            }],
            where: { 
                userId: userId,
                status: 'completed'
            }
        });
        return !!order;
    } catch (e) {
        console.error('Error verifying purchase:', e);
        return false;
    }
};

let create = async (req, res) => {
    try {
        const { userId, productId, rating, comment } = req.body;

        if (!userId || !productId || !rating || !comment) {
            return res.status(400).json({
                message: 'Vui lòng cung cấp đầy đủ thông tin đánh giá'
            });
        }

        const hasPurchased = await verifyPurchase(userId, productId);
        if (!hasPurchased) {
            return res.status(403).json({ 
                message: 'Bạn chỉ có thể đánh giá sản phẩm mà bạn đã mua' 
            });
        }

        const existingReview = await db.Review.findOne({
            where: { userId, productId }
        });

        if (existingReview) {
            return res.status(400).json({ 
                message: 'Bạn đã đánh giá sản phẩm này rồi' 
            });
        }

        const review = await db.Review.create({
            userId,
            productId,
            rating,
            comment
        });

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