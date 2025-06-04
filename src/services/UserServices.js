import db from '../models';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let hashPasswordFromBcrypt = await hashUserPassword(password);
            let isExist = await checkUserEmail(email, hashPasswordFromBcrypt);
            if(isExist) {
                let user = await db.User.findOne({
                    attributes: ["email", "typeRole", "keyRole", "password"],
                    where: { email },
                    raw: true,
                })
                if(user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    if(check) {
                        userData.errCode = 0;
                        userData.errMessage = "Đăng nhập thành công!";
                        userData.email = email;
                        userData.password = hashPasswordFromBcrypt;
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Mật khẩu không đúng";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "Email không tồn tại trong hệ thống";
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = "Email không tồn tại trong hệ thống";
            }
            resolve(userData);
        } catch (e) {
           reject(e)
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email },
                raw: true,
            });
            if(user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (e) {
           reject(e)
        }
    })

}

let postUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                typeRole: data.typeRole,
                keyRole: data.keyRole,
                payment: data.payment,
            })

            resolve('Tạo người dùng thành công!')
        } catch (e) {
           reject(e)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e) 
        }
    })

}

module.exports = {
    handleUserLogin,
    postUser,
    getAllUsers,
}