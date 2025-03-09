import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/api/login', userController.handleLogin);
    router.get('/api/create-user', homeController.createUser);
    router.get('/api/get-all-users', homeController.getAllUsers);

    return app.use("/", router);
}

module.exports = initWebRoutes;