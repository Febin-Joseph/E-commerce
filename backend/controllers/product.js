import { productData } from "../data/productsData.js";

export const products = ((req, res) => {
    let { page = 1, limit = 10, search = '', category = '', minPrice = '', maxPrice = '', sort = '' } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    minPrice = minPrice ? parseFloat(minPrice) : null;
    maxPrice = maxPrice ? parseFloat(maxPrice) : null;

    let filtered = [...productData];

    if (search) {
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }

    if (minPrice !== null) {
        filtered = filtered.filter(p => p.price >= minPrice);
    }

    if (maxPrice !== null) {
        filtered = filtered.filter(p => p.price <= maxPrice);
    }

    if (sort === 'asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
        filtered.sort((a, b) => b.price - a.price);
    }

    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    res.json({ products: paginated, total });
});