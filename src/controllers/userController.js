import db from '../models/index'
import UserService from '../services/UserServices'

let handleLogin = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        if(!email || !password) {
            return res.status(500).json({
                errCode: 1,
                message: "Missing inputs parameter"
            })
        }

        let userData = await UserService.handleUserLogin(email, password);
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData?.user ? userData : {},
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    handleLogin,
}