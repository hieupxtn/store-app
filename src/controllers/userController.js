import db from '../models/index'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

let register = async (req, res) => {
    try {
        let { email, password, firstName, lastName, address, gender, role } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing email or password' });
        }
        let hash = bcrypt.hashSync(password, 10);
        let user = await db.User.create({ email, password: hash, firstName, lastName, address, gender, role });
        return res.status(201).json({ user });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing email or password' });
        }
        let user = await db.User.findOne({ where: { email } });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1d' }
        );
        return res.status(200).json({ user, token });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let logout = async (req, res) => {
    // Với JWT, logout chỉ cần FE xóa token, backend chỉ trả về thông báo
    return res.status(200).json({ message: 'Logout successful' });
};

let getAll = async (req, res) => {
    try {
        let users = await db.User.findAll();
        return res.status(200).json({ users });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let getById = async (req, res) => {
    try {
        let user = await db.User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ user });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let update = async (req, res) => {
    try {
        let user = await db.User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await user.update(req.body);
        return res.status(200).json({ user });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

let remove = async (req, res) => {
    try {
        let user = await db.User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await user.destroy();
        return res.status(204).send();
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = { register, login, logout, getAll, getById, update, remove };