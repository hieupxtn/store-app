import jwt from 'jsonwebtoken';

export function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

export function isAdmin(req, res, next) {
    // Giả sử user đã được xác thực và gán vào req.user
    // (thực tế nên dùng JWT hoặc session, ở đây demo đơn giản)
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Forbidden: Admins only' });
} 