import { Request, Response } from 'express';
import { CreateOrUpdateProductCommand } from '../../application/commands/CreateOrUpdateProductCommand';
import { CreateProductHandler } from '../../application/commands/handlers/CreateProductHandler';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { ProductRepository } from '../../infrastructure/repositories/ProductRepository';
import { UpdateProductHandler } from '../../application/commands/handlers/UpdateProductHandler';
import { DeleteProductHandler } from '../../application/commands/handlers/DeleteProductHandler';
import { GetAllProductHandler } from '../../application/queries/GetAllProductHandler';
import { GetOneProductHandler } from '../../application/queries/GetOneProductHandler';

export class ProductController {
  private readonly createProductHandler: CreateProductHandler;
  private readonly updateProductHandler: UpdateProductHandler;
  private readonly deleteProductHandler: DeleteProductHandler;
  private readonly getAllProductHandler: GetAllProductHandler;
  private readonly getProductByIdHandler: GetOneProductHandler;

  constructor() {
    const productRepository: IProductRepository = new ProductRepository();
    this.createProductHandler = new CreateProductHandler(productRepository);
    this.updateProductHandler = new UpdateProductHandler(productRepository);
    this.deleteProductHandler = new DeleteProductHandler(productRepository);
    this.getAllProductHandler = new GetAllProductHandler(productRepository);
    this.getProductByIdHandler = new GetOneProductHandler(productRepository);
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, price, currency, stock } = req.body;
      const command = new CreateOrUpdateProductCommand(name, description, price, currency, stock);
      const product = await this.createProductHandler.execute(command);
      res.status(201).json(product);
    } catch (error: unknown) {
      res.status(400).json({ error: error.toString() });
    }
  }

  async getAllProduct(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.getAllProductHandler.execute();
      res.status(200).json(products)
    } catch (error: unknown) {
      res.status(400).json({ error: error.toString() });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const product = await this.getProductByIdHandler.execute(id);
      if (!product) {
        res.status(404).send();
        return;
      }
      res.status(200).json(product);
    } catch (error: unknown) {
      res.status(400).json({ error: error.toString() });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { name, description, price, currency, stock } = req.body;
      const command = new CreateOrUpdateProductCommand(name, description, price, currency, stock);
      const product = await this.updateProductHandler.execute(id, command);
      res.status(200).json(product);
    } catch (error: unknown) {
      res.status(400).json({ error: error.toString() });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      await this.deleteProductHandler.execute(id);
      res.status(204).send();
    } catch (error: unknown) {
      res.status(400).json({ error: error.toString() });
    }
  }
}
