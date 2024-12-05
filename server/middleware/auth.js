import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const validateAdminPassword = async (password) => {
  if (!process.env.ADMIN_PASSWORD) {
    throw new Error('Admin password not configured');
  }
  return await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
};