import express from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { password } = req.body;
    
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { adminId: 'admin' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.json({ token, expiresIn: 3600 });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage });

// Protected routes
router.post('/products', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, sizes } = req.body;
    const imageUrl = req.file.path;

    // Add product to database/storage
    // For now, we'll just return success
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

router.put('/products/:id', upload.single('image'), async (req, res) => {
router.put('/products/:id', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, sizes } = req.body;
    const imageUrl = req.file?.path;

    // Update product in database/storage
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

router.delete('/products/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Delete product from database/storage
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;