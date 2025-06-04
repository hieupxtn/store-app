import db from '../models/index';
const Order = db.Order;
const OrderItem = db.OrderItem;
const Product = db.Product;
const { Op } = require('sequelize');

let create = async (req, res) => {
    try {
        const {
            userId, // Optional - for authenticated users
            customerInfo,
            shippingAddress,
            paymentMethod,
            cartItems,
            couponCode
        } = req.body;

        // Validate required fields
        if (!customerInfo || !shippingAddress || !paymentMethod || !cartItems) {
            return res.status(400).json({
                message: 'Missing required fields',
                required: {
                    customerInfo: 'Object containing name, phone, email',
                    shippingAddress: 'String',
                    paymentMethod: 'String',
                    cartItems: 'Array of items with productId and quantity'
                }
            });
        }

        // Validate customer info
        const { name, phone, email } = customerInfo;
        if (!name || !phone || !email) {
            return res.status(400).json({
                message: 'Missing customer information',
                required: {
                    name: 'Customer name',
                    phone: 'Customer phone number',
                    email: 'Customer email'
                }
            });
        }

        // Validate cart items
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({
                message: 'Cart items must be a non-empty array'
            });
        }

        // Check if all products exist and have sufficient stock
        const productIds = cartItems.map(item => item.productId);
        const products = await Product.findAll({
            where: {
                id: {
                    [Op.in]: productIds
                }
            }
        });

        if (products.length !== productIds.length) {
            const foundIds = products.map(p => p.id);
            const missingIds = productIds.filter(id => !foundIds.includes(id));
            return res.status(404).json({
                message: 'Một số sản phẩm không tìm thấy',
                missingProductIds: missingIds
            });
        }

        // Calculate total price and validate quantities
        let totalPrice = 0;
        for (const item of cartItems) {
            const product = products.find(p => p.id === item.productId);
            if (!product) continue;

            if (item.quantity > product.quantity) {
                return res.status(400).json({
                    message: `Không đủ hàng cho sản phẩm ${product.id}`,
                    productId: product.id,
                    available: product.quantity,
                    requested: item.quantity
                });
            }

            totalPrice += product.price * item.quantity;
        }

        // Apply coupon discount if provided
        if (couponCode) {
            const coupon = await db.Coupon.findOne({
                where: {
                    code: couponCode,
                    expiryDate: {
                        [Op.gt]: new Date()
                    }
                }
            });

            if (coupon) {
                totalPrice = Math.max(0, totalPrice - coupon.discount);
            }
        }

        // Create order
        const order = await Order.create({
            userId: userId || null, // Set userId if provided
            totalPrice,
            status: 'pending',
            shippingAddress,
            paymentMethod,
            customerName: name,
            customerPhone: phone,
            customerEmail: email
        });

        // Create order items and update product quantities
        const orderItems = await Promise.all(
            cartItems.map(async (item) => {
                const product = products.find(p => p.id === item.productId);
                
                // Create order item
                const orderItem = await OrderItem.create({
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price
                });

                // Update product quantity
                await Product.update(
                    { quantity: product.quantity - item.quantity },
                    { where: { id: item.productId } }
                );

                return orderItem;
            })
        );

        // Return success response
        return res.status(201).json({
            message: 'Order created successfully',
            order: {
                id: order.id,
                totalPrice: order.totalPrice,
                status: order.status,
                shippingAddress: order.shippingAddress,
                paymentMethod: order.paymentMethod,
                customerInfo: {
                    name: order.customerName,
                    phone: order.customerPhone,
                    email: order.customerEmail
                },
                items: orderItems.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                }))
            }
        });

    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({
            message: 'Error creating order',
            error: error.message
        });
    }
};

let getAll = async (req, res) => {
    try {
        const orders = await db.Order.findAll({
            include: [{
                model: db.OrderItem,
                include: [{
                    model: db.Product,
                    include: [{
                        model: db.ProductType,
                        attributes: ['name']
                    }]
                }]
            }],
            order: [['createdAt', 'DESC']]
        });

        const formattedOrders = orders.map(order => ({
            id: order.id,
            totalAmount: order.totalPrice,
            status: order.status,
            shippingAddress: order.shippingAddress,
            paymentMethod: order.paymentMethod,
            customerInfo: {
                name: order.customerName,
                phone: order.customerPhone,
                email: order.customerEmail
            },
            items: order.OrderItems.map(item => ({
                productId: item.productId,
                productName: item.Product.productName,
                productType: item.Product.ProductType.name,
                quantity: item.quantity,
                price: item.price,
                total: item.quantity * item.price
            })),
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        }));

        return res.status(200).json({
            success: true,
            orders: formattedOrders
        });
    } catch (e) {
        console.error('Error getting orders:', e);
        return res.status(500).json({ 
            message: 'Error getting orders',
            error: e.message 
        });
    }
};

let getById = async (req, res) => {
    try {
        const order = await db.Order.findByPk(req.params.id, {
            include: [{
                model: db.OrderItem,
                include: [{
                    model: db.Product,
                    include: [{
                        model: db.ProductType,
                        attributes: ['name']
                    }]
                }]
            }]
        });

        if (!order) {
            return res.status(404).json({ 
                message: 'Không tìm thấy đơn hàng' 
            });
        }

        const formattedOrder = {
            id: order.id,
            totalAmount: order.totalPrice,
            status: order.status,
            shippingAddress: order.shippingAddress,
            paymentMethod: order.paymentMethod,
            customerInfo: {
                name: order.customerName,
                phone: order.customerPhone,
                email: order.customerEmail
            },
            items: order.OrderItems.map(item => ({
                productId: item.productId,
                productName: item.Product.productName,
                productType: item.Product.ProductType.name,
                quantity: item.quantity,
                price: item.price,
                total: item.quantity * item.price
            })),
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        };

        return res.status(200).json({
            success: true,
            order: formattedOrder
        });
    } catch (e) {
        console.error('Error getting order:', e);
        return res.status(500).json({ 
            message: 'Error getting order',
            error: e.message 
        });
    }
};

let update = async (req, res) => {
    try {
        const order = await db.Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ 
                message: 'Không tìm thấy đơn hàng' 
            });
        }

        const allowedUpdates = ['status', 'shippingAddress', 'paymentMethod'];
        const updates = {};
        
        for (const field of allowedUpdates) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        await order.update(updates);

        return res.status(200).json({
            success: true,
            message: 'Cập nhật trạng thái đơn hàng thành công',
            order: {
                id: order.id,
                status: order.status,
                shippingAddress: order.shippingAddress,
                paymentMethod: order.paymentMethod,
                updatedAt: order.updatedAt
            }
        });
    } catch (e) {
        console.error('Error updating order:', e);
        return res.status(500).json({ 
            message: 'Lỗi khi cập nhật trạng thái đơn hàng',
            error: e.message 
        });
    }
};

let remove = async (req, res) => {
    try {
        const order = await db.Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ 
                message: 'Không tìm thấy đơn hàng' 
            });
        }

        // Start a transaction
        const transaction = await db.sequelize.transaction();

        try {
            // Get order items
            const orderItems = await db.OrderItem.findAll({
                where: { orderId: order.id }
            });

            // Restore product quantities
            for (const item of orderItems) {
                await db.Product.increment('quantity', {
                    by: item.quantity,
                    where: { id: item.productId },
                    transaction
                });
            }

            // Delete order items
            await db.OrderItem.destroy({
                where: { orderId: order.id },
                transaction
            });

            // Delete order
            await order.destroy({ transaction });

            // Commit transaction
            await transaction.commit();

            return res.status(200).json({
                success: true,
                message: 'Order deleted successfully'
            });
        } catch (error) {
            // Rollback transaction on error
            await transaction.rollback();
            throw error;
        }
    } catch (e) {
        console.error('Error deleting order:', e);
        return res.status(500).json({ 
            message: 'Error deleting order',
            error: e.message 
        });
    }
};

let updateStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        // Validate status
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Trạng thái không hợp lệ',
                validStatuses: validStatuses
            });
        }

        // Find order
        const order = await Order.findByPk(orderId, {
            include: [{
                model: OrderItem,
                include: [{
                    model: Product
                }]
            }]
        });

        if (!order) {
            return res.status(404).json({
                message: 'Không tìm thấy đơn hàng'
            });
        }

        // If cancelling order, restore product quantities
        if (status === 'cancelled' && order.status !== 'cancelled') {
            for (const item of order.OrderItems) {
                await Product.increment('quantity', {
                    by: item.quantity,
                    where: { id: item.productId }
                });
            }
        }

        // Update order status
        await order.update({ status });

        return res.status(200).json({
            message: 'Cập nhật trạng thái đơn hàng thành công',
            order: {
                id: order.id,
                status: order.status,
                updatedAt: order.updatedAt
            }
        });

    } catch (error) {
        console.error('Error updating order status:', error);
        return res.status(500).json({
            message: 'Lỗi khi cập nhật trạng thái đơn hàng',
            error: error.message
        });
    }
};

let getByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        // Validate user exists
        const user = await db.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ 
                message: 'Không tìm thấy người dùng' 
            });
        }

        const orders = await db.Order.findAll({
            where: { userId },
            include: [{
                model: db.OrderItem,
                include: [{
                    model: db.Product,
                    include: [{
                        model: db.ProductType,
                        attributes: ['name']
                    }]
                }]
            }],
            order: [['createdAt', 'DESC']]
        });

        const formattedOrders = orders.map(order => ({
            id: order.id,
            totalAmount: order.totalPrice,
            status: order.status,
            shippingAddress: order.shippingAddress,
            paymentMethod: order.paymentMethod,
            customerInfo: {
                name: order.customerName,
                phone: order.customerPhone,
                email: order.customerEmail
            },
            items: order.OrderItems.map(item => ({
                productId: item.productId,
                productName: item.Product.productName,
                productType: item.Product.ProductType.name,
                quantity: item.quantity,
                price: item.price,
                total: item.quantity * item.price
            })),
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        }));

        return res.status(200).json({
            success: true,
            orders: formattedOrders
        });
    } catch (e) {
        console.error('Error getting user orders:', e);
        return res.status(500).json({ 
            message: 'Lỗi khi lấy danh sách đơn hàng',
            error: e.message 
        });
    }
};

module.exports = { create, getAll, getById, update, remove, updateStatus, getByUserId }; 