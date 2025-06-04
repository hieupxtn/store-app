import db from '../models/index';

let getAll = async (req, res) => {
    try {
        const { search, minPrice, maxPrice, typeId, brandId, sort, minRating } = req.query;
        
        let whereClause = {};
        
        if (search) {
            whereClause[db.Sequelize.Op.or] = [
                { productName: { [db.Sequelize.Op.like]: `%${search}%` } },
                { description: { [db.Sequelize.Op.like]: `%${search}%` } }
            ];
        }

        if (minPrice || maxPrice) {
            whereClause.price = {};
            if (minPrice) whereClause.price[db.Sequelize.Op.gte] = minPrice;
            if (maxPrice) whereClause.price[db.Sequelize.Op.lte] = maxPrice;
        }

        if (minRating) {
            whereClause.rating = {
                [db.Sequelize.Op.gte]: parseFloat(minRating)
            };
        }

        if (typeId) {
            whereClause.productTypeId = typeId;
        }

        if (brandId) {
            whereClause.brandId = brandId;
        }

        let orderClause = [];
        if (sort) {
            switch (sort) {
                case 'featured':
                    whereClause.rating = { [db.Sequelize.Op.gte]: 4 };
                    orderClause.push(['rating', 'DESC']);
                    break;
                case 'price_low':
                    orderClause.push(['price', 'ASC']);
                    break;
                case 'price_high':
                    orderClause.push(['price', 'DESC']);
                    break;
                case 'rating':
                    orderClause.push(['rating', 'DESC']);
                    break;
                case 'newest':
                    orderClause.push(['createdAt', 'DESC']);
                    break;
                case 'best_seller':
                    orderClause = [
                        [db.sequelize.literal(`
                            (SELECT SUM(quantity) 
                            FROM orderitems 
                            WHERE orderitems.productId = Product.id)
                        `), 'DESC'],
                        ['createdAt', 'DESC']
                    ];
                    break;
                default:
                    orderClause.push(['createdAt', 'DESC']);
            }
        } else {
            orderClause.push(['createdAt', 'DESC']);
        }

        let products = await db.Product.findAll({
            where: whereClause,
            include: [
                { model: db.ProductType },
                { model: db.Brand }
            ],
            order: orderClause,
            attributes: [
                'id',
                'productName',
                'price',
                'image',
                'description',
                'specifications',
                'rating',
                'quantity'
            ]
        });
        return res.status(200).json({ products });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let getById = async (req, res) => {
    try {
        let product = await db.Product.findByPk(req.params.id, {
            include: [
                { model: db.ProductType },
                { model: db.Brand }
            ],
            attributes: [
                'id',
                'productName',
                'price',
                'image',
                'description',
                'specifications',
                'rating',
                'quantity'
            ]
        });
        if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
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
        if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        await product.update(req.body);
        return res.status(200).json({ product });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let remove = async (req, res) => {
    try {
        let product = await db.Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        await product.destroy();
        return res.status(204).send();
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let getFeatured = async (req, res) => {
    try {
        let products = await db.Product.findAll({ where: { rating: { [db.Sequelize.Op.gte]: 4 } }, limit: 8 });
        return res.status(200).json({ products });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let getBestSellers = async (req, res) => {
    try {
        let products = await db.Product.findAll({
            order: [['quantity', 'ASC']],
            limit: 10,
            include: [{ model: db.ProductType }]
        });
        return res.status(200).json({ products });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let getNewProducts = async (req, res) => {
    try {
        let products = await db.Product.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10,
            include: [{ model: db.ProductType }]
        });
        return res.status(200).json({ products });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let getRelatedProducts = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await db.Product.findByPk(productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }

        const relatedProducts = await db.Product.findAll({
            where: {
                [db.Sequelize.Op.or]: [
                    { productTypeId: product.productTypeId },
                    { brandId: product.brandId }
                ],
                id: {
                    [db.Sequelize.Op.ne]: productId
                }
            },
            limit: 8,
            include: [
                { model: db.ProductType },
                { model: db.Brand }
            ],
            attributes: [
                'id',
                'productName',
                'price',
                'image',
                'description',
                'specifications',
                'rating',
                'quantity'
            ]
        });

        return res.status(200).json({ 
            relatedProducts,
            currentProduct: {
                id: product.id,
                productName: product.productName,
                price: product.price,
                image: product.image,
                description: product.description,
                specifications: product.specifications,
                rating: product.rating,
                quantity: product.quantity,
                ProductType: product.ProductType,
                Brand: product.Brand
            }
        });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = { getAll, getById, create, update, remove, getFeatured, getBestSellers, getNewProducts, getRelatedProducts }; 