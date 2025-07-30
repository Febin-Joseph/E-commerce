import { productData } from "../data/productsData.js";

export const addToCart = (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const product = productData.find(p => p.id === parseInt(productId));
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be greater than 0' });
        }

        res.json({
            message: 'Product added to cart successfully',
            product: {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: quantity
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};