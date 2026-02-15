const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        success: false,
        message: `Access denied. ${requiredRole} role required`,
      });
    }

    next();
  };
};

export default roleMiddleware;
