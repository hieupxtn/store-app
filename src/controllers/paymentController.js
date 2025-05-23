import db from '../models/index';

let processPayment = async (req, res) => {
    try {
        const { 
            paymentMethod, 
            shippingAddress,
            couponCode,
            customerInfo // Thông tin khách hàng không đăng nhập
        } = req.body;

        // Validate required fields
        if (!customerInfo || !customerInfo.name || !customerInfo.phone || !customerInfo.email) {
            return res.status(400).json({ 
                message: 'Customer information is required (name, phone, email)' 
            });
        }

        // Calculate total amount from cart items
        let totalAmount = 0;
        const cartItems = req.body.cartItems || [];
        
        if (!cartItems.length) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Validate and calculate total
        for (const item of cartItems) {
            if (!item.productId || !item.quantity) {
                return res.status(400).json({ 
                    message: 'Each cart item must have productId and quantity' 
                });
            }

            const product = await db.Product.findByPk(item.productId);
            if (!product) {
                return res.status(404).json({ 
                    message: `Product with ID ${item.productId} not found` 
                });
            }

            if (product.quantity < item.quantity) {
                return res.status(400).json({ 
                    message: `Not enough stock for product ${product.productName}` 
                });
            }

            totalAmount += product.price * item.quantity;
        }

        // Apply coupon if provided
        let discount = 0;
        if (couponCode) {
            const coupon = await db.Coupon.findOne({
                where: { code: couponCode, isActive: true }
            });
            if (coupon) {
                discount = (totalAmount * coupon.discountPercent) / 100;
                totalAmount -= discount;
            }
        }

        // Simulate payment processing
        const paymentStatus = Math.random() > 0.1 ? 'success' : 'failed'; // 90% success rate

        if (paymentStatus === 'success') {
            // Create order for guest
            const order = await db.Order.create({
                totalPrice: totalAmount,
                status: 'pending',
                shippingAddress,
                paymentMethod,
                customerName: customerInfo.name,
                customerPhone: customerInfo.phone,
                customerEmail: customerInfo.email
            });

            // Create order items
            for (const item of cartItems) {
                const product = await db.Product.findByPk(item.productId);
                await db.OrderItem.create({
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price
                });

                // Update product quantity
                await db.Product.update(
                    { quantity: product.quantity - item.quantity },
                    { where: { id: item.productId } }
                );
            }

            return res.status(200).json({
                success: true,
                message: 'Payment successful',
                order: {
                    id: order.id,
                    totalAmount,
                    discount,
                    paymentMethod,
                    shippingAddress,
                    customerInfo,
                    status: 'pending'
                }
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Payment failed. Please try again.'
            });
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = { processPayment }; 