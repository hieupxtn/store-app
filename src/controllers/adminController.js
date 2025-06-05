import db from '../models/index';

let dashboardStatistics = async (req, res) => {
    try {
        const [userCount, productCount, orderCount, reviewCount, productTypeCount, revenueSum] = await Promise.all([
            db.User.count(),
            db.Product.count(),
            db.Order.count(),
            db.Review.count(),
            db.ProductType.count(),
            db.Order.sum('totalPrice', {
                where: {
                    [db.Sequelize.Op.or]: [
                        { status: 'completed' },
                        { paymentMethod: 'credit_card' }
                    ]
                }
            })
        ]);
        return res.status(200).json({
            totalUsers: userCount,
            totalProducts: productCount,
            totalOrders: orderCount,
            totalReviews: reviewCount,
            totalProductTypes: productTypeCount,
            totalRevenue: revenueSum || 0
        });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = { dashboardStatistics }; 