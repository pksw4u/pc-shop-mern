import { Router } from 'express';
import { getCompatibleProducts, checkCompatibility, getBuildSuggestions, getPCBuildCategories } from '../controllers/buildpc.controller';

const router = Router();

// GET /api/buildpc/compatible/:productId
router.get('/compatible/:productId', getCompatibleProducts);

// POST /api/buildpc/check-compatibility
router.post('/check-compatibility', checkCompatibility);

// GET /api/buildpc/suggestions
router.get('/suggestions', getBuildSuggestions);

// GET /api/buildpc/categories
router.get('/categories', getPCBuildCategories);

export default router;