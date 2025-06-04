import db from '../models/index'
import UserService from '../services/UserServices'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e)
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getAllUsers = async (req, res) => {
    try {
        let data = await UserService.getAllUsers();
        return res.send({
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e)
    }
}

let createUser = async (req, res) => {
    try {
        let message = await UserService.postUser(req);
        return res.send(message);
    } catch (e) {
        console.log(e)
    }
}

let getFeaturedProducts = async (req, res) => {
    try {
        let products = await db.Product.findAll({
            where: { rating: { [db.Sequelize.Op.gte]: 4 } },
            limit: 10
        });
        return res.status(200).json({
            errCode: 0,
            message: 'OK',
            products
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: 1,
            message: 'Lỗi khi lấy sản phẩm nổi bật'
        });
    }
}

module.exports = {
    getHomePage,
    getAboutPage,
    getAllUsers,
    createUser,
    getFeaturedProducts,
}