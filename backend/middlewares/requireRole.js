
const requireRole = (role) => {
  return (req, res, next) => {
    // req.user is populated by authMiddleware after token validation
    if (req.user && req.user.role === role) {
      next();
    } else {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
  };
};

module.exports = requireRole;

module.exports = (role) => {
  return (req, res, next) => {
      if (req.user.role !== role) {
          return res.status(403).json({ message: 'Access denied' });
      }
      next();
  };
};

