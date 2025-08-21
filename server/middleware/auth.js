import jwt from 'jsonwebtoken';

// Admin API Key middleware
export const requireAdminKey = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'] || req.query.admin_key;
  
  if (!adminKey || adminKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ 
      error: 'Unauthorized - Invalid admin key' 
    });
  }
  
  next();
};

// JWT Token middleware (for future use)
export const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      error: 'Access denied - No token provided' 
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      error: 'Invalid token' 
    });
  }
};
