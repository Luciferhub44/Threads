import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { Settings } from '../models/Settings.js';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Get settings
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update settings (Admin only)
router.put('/', protect, admin, upload.single('logo'), async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    // Update text fields
    Object.keys(req.body).forEach(key => {
      if (key !== 'logo') {
        settings[key] = req.body[key];
      }
    });

    // Handle logo upload
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'), {
        folder: 'store'
      });
      settings.logo = result.secure_url;
    }

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;