const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

// 1. Create Category
router.post('/Create_Category', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: 'Category name is required' });

        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json({ message: 'Category created', category: newCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Get All Categories
router.get('/GetAllCategories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Update Category
router.put('/Update_Category/:id', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: 'New category name is required' });

        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!updatedCategory) return res.status(404).json({ error: 'Category not found' });

        res.status(200).json({ message: 'Category updated', category: updatedCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Get Category by ID
router.get('/GetCategoryByBId/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Delete Category by ID
router.delete('/DeleteCategoryByBId/:id', async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ error: 'Category not found' });

        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
