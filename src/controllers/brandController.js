import db from '../models/index';

let getAllBrands = async (req, res) => {
    try {
        let brands = await db.Brand.findAll({
            include: [{
                model: db.Product,
                as: 'products',
                attributes: ['id', 'productName', 'price']
            }]
        });
        return res.status(200).json(brands);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let getBrandById = async (req, res) => {
    try {
        let brand = await db.Brand.findOne({
            where: { id: req.params.id },
            include: [{
                model: db.Product,
                as: 'products',
                attributes: ['id', 'productName', 'price']
            }]
        });
        if (!brand) {
            return res.status(404).json({ message: 'Không tìm thấy thương hiệu' });
        }
        return res.status(200).json(brand);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let createBrand = async (req, res) => {
    try {
        let brand = await db.Brand.create({
            name: req.body.name,
            description: req.body.description,
            logo: req.body.logo
        });
        return res.status(201).json(brand);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let updateBrand = async (req, res) => {
    try {
        let brand = await db.Brand.findOne({ where: { id: req.params.id } });
        if (!brand) {
            return res.status(404).json({ message: 'Không tìm thấy thương hiệu' });
        }
        
        await brand.update({
            name: req.body.name,
            description: req.body.description,
            logo: req.body.logo
        });
        
        return res.status(200).json(brand);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let deleteBrand = async (req, res) => {
    try {
        let brand = await db.Brand.findOne({ where: { id: req.params.id } });
        if (!brand) {
            return res.status(404).json({ message: 'Không tìm thấy thương hiệu' });
        }
        
        await brand.destroy();
        return res.status(200).json({ message: 'Thương hiệu đã được xóa thành công' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
}; 