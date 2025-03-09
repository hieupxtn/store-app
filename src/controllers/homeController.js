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

module.exports = {
    getHomePage,
    getAboutPage,
    getAllUsers,
    createUser,
}