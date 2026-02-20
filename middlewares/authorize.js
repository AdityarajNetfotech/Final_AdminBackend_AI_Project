import ErrorResponse from '../utils/errorResponse.js';

export const authorizes = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(new ErrorResponse('Not authorized', 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ErrorResponse('Forbidden: insufficient role', 403));
    }

    next();
  };
};