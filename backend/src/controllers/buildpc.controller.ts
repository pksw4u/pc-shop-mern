import { Request, Response } from 'express';
import Product from '../models/product.model';
import Category from '../models/category.model';
import CompatibilityRule from '../models/compatibilityRules.model';

export const getCompatibleProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;

    // Get compatibility rules for the product
    const rules = await CompatibilityRule.findOne({ productId }).populate('compatibleWith', 'name price category');

    if (!rules) {
      res.json({ compatibleProducts: [] });
      return;
    }

    res.json({ compatibleProducts: rules.compatibleWith });
  } catch (error: any) {
    console.error('Get compatible products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const checkCompatibility = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productIds } = req.body;

    if (!Array.isArray(productIds) || productIds.length < 2) {
      res.status(400).json({ message: 'At least 2 product IDs required' });
      return;
    }

    const products = await Product.find({ _id: { $in: productIds } });
    if (products.length !== productIds.length) {
      res.status(404).json({ message: 'Some products not found' });
      return;
    }

    // Check compatibility rules
    const compatibilityIssues: string[] = [];
    const compatiblePairs: string[] = [];

    for (let i = 0; i < productIds.length; i++) {
      for (let j = i + 1; j < productIds.length; j++) {
        const productA = productIds[i];
        const productB = productIds[j];

        // Check if they are incompatible
        const ruleA = await CompatibilityRule.findOne({
          productId: productA,
          incompatibleWith: productB,
        });

        const ruleB = await CompatibilityRule.findOne({
          productId: productB,
          incompatibleWith: productA,
        });

        if (ruleA || ruleB) {
          const nameA = products.find(p => (p._id as any).toString() === productA)?.name || productA;
          const nameB = products.find(p => (p._id as any).toString() === productB)?.name || productB;
          compatibilityIssues.push(`${nameA} is incompatible with ${nameB}`);
        } else {
          // Check if they are compatible
          const compatRuleA = await CompatibilityRule.findOne({
            productId: productA,
            compatibleWith: productB,
          });

          const compatRuleB = await CompatibilityRule.findOne({
            productId: productB,
            compatibleWith: productA,
          });

          if (compatRuleA || compatRuleB) {
            const nameA = products.find(p => (p._id as any).toString() === productA)?.name || productA;
            const nameB = products.find(p => (p._id as any).toString() === productB)?.name || productB;
            compatiblePairs.push(`${nameA} is compatible with ${nameB}`);
          }
        }
      }
    }

    const isCompatible = compatibilityIssues.length === 0;

    res.json({
      isCompatible,
      compatibilityIssues,
      compatiblePairs,
      products: products.map(p => ({ id: p._id, name: p.name, category: p.category })),
    });
  } catch (error: any) {
    console.error('Check compatibility error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBuildSuggestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, budget } = req.query;

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (budget) {
      query.price = { $lte: Number(budget) };
    }

    // Get popular products in the category
    const suggestions = await Product.find(query)
      .populate('category', 'name')
      .sort({ stock: -1 }) // Sort by stock (assuming higher stock = more popular)
      .limit(10);

    res.json({ suggestions });
  } catch (error: any) {
    console.error('Get build suggestions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPCBuildCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get categories commonly used in PC building
    const pcCategories = [
      'CPU',
      'Motherboard',
      'RAM',
      'GPU',
      'Storage',
      'Power Supply',
      'Case',
      'CPU Cooler',
    ];

    const categories = await Category.find({
      name: { $in: pcCategories },
    });

    res.json({ categories });
  } catch (error: any) {
    console.error('Get PC build categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};