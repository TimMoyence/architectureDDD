import { Request, Response } from 'express';
import { CreateOrUpdateProductCommand } from '../../application/commands/CreateOrUpdateProductCommand';
import { CreateProductUseCase } from '../../application/commands/handlers/CreateProduct.useCase';
import { DeleteProductUseCase } from '../../application/commands/handlers/DeleteProduct.useCase';
import { UpdateProductUseCase } from '../../application/commands/handlers/UpdateProduct.useCase';
import { GetAllProductUseCase } from '../../application/queries/GetAllProduct.useCase';
import { GetOneProductUseCase } from '../../application/queries/GetOneProduct.useCase';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { ProductRepository } from '../../infrastructure/repositories/ProductRepository';

export class ProductController {
  private readonly CreateProductUseCase: CreateProductUseCase;
  private readonly UpdateProductUseCase: UpdateProductUseCase;
  private readonly DeleteProductUseCase: DeleteProductUseCase;
  private readonly GetAllProductUseCase: GetAllProductUseCase;
  private readonly getProductByIdUseCase: GetOneProductUseCase;

  constructor() {
    const productRepository: IProductRepository = new ProductRepository();
    this.CreateProductUseCase = new CreateProductUseCase(productRepository);
    this.UpdateProductUseCase = new UpdateProductUseCase(productRepository);
    this.DeleteProductUseCase = new DeleteProductUseCase(productRepository);
    this.GetAllProductUseCase = new GetAllProductUseCase(productRepository);
    this.getProductByIdUseCase = new GetOneProductUseCase(productRepository);
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, price, currency, stock } = req.body;
      const command = new CreateOrUpdateProductCommand(name, description, price, currency, stock);
      const product = await this.CreateProductUseCase.execute(command);
      res.status(201).json(product);
    } catch (error: unknown) {
      res.status(400).json({ error: error.toString() });
    }
  }

  async getAllProduct(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.GetAllProductUseCase.execute();
      res.status(200).json(products)
    } catch (error: unknown) {
      res.status(400).json({ error: error.toString() });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const product = await this.getProductByIdUseCase.execute(id);
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
      const product = await this.UpdateProductUseCase.execute(id, command);
      res.status(200).json(product);
    } catch (error: unknown) {
      res.status(400).json({ error: error.toString() });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      await this.DeleteProductUseCase.execute(id);
      res.status(204).send();
    } catch (error: unknown) {
      res.status(400).json({ error: error.toString() });
    }
  }
}
