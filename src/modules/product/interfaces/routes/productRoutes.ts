import { Router } from 'express';
import { ProductController } from '../controllers/Product.controller';

const router = Router();
const productController = new ProductController();

router.post('/products', (req, res) => productController.createProduct(req, res));
router.get('/products', (req,res) => productController.getAllProduct(req,res));
router.get('/products/:id', (req, res) => productController.getProductById(req, res));
router.put('/products/:id', (req, res) => productController.updateProduct(req, res));
router.delete('/products/:id', (req, res) => productController.deleteProduct(req, res));

export { router as productRoutes };
