import { Request, Response, NextFunction } from 'express';

export const validateRegistration = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    res.status(400).json({ message: 'Name must be at least 2 characters long' });
    return;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ message: 'Valid email is required' });
    return;
  }

  if (!password || password.length < 6) {
    res.status(400).json({ message: 'Password must be at least 6 characters long' });
    return;
  }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  next();
};

export const validateProduct = (req: Request, res: Response, next: NextFunction): void => {
  const { name, price, category } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    res.status(400).json({ message: 'Product name must be at least 2 characters long' });
    return;
  }

  if (!price || typeof price !== 'number' || price <= 0) {
    res.status(400).json({ message: 'Valid price is required' });
    return;
  }

  if (!category) {
    res.status(400).json({ message: 'Category is required' });
    return;
  }

  next();
};

export const validateOrder = (req: Request, res: Response, next: NextFunction): void => {
  const { products, shippingAddress } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    res.status(400).json({ message: 'At least one product is required' });
    return;
  }

  for (const item of products) {
    if (!item.product || !item.quantity || item.quantity < 1) {
      res.status(400).json({ message: 'Each product must have valid product ID and quantity' });
      return;
    }
  }

  if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.zip || !shippingAddress.country) {
    res.status(400).json({ message: 'Complete shipping address is required' });
    return;
  }

  next();
};

export const validateCategory = (req: Request, res: Response, next: NextFunction): void => {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    res.status(400).json({ message: 'Category name must be at least 2 characters long' });
    return;
  }

  next();
};