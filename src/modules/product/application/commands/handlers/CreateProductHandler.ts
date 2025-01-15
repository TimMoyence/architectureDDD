import { v4 as uuidv4 } from 'uuid';
import { Product } from '../../../domain/entities/Product';
import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { Price } from '../../../domain/valueObjects/Price';
import { CreateOrUpdateProductCommand } from '../CreateOrUpdateProductCommand';

export class CreateProductHandler {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(command: CreateOrUpdateProductCommand): Promise<Product> {
    const price = new Price(command.price, command.currency);
    const product = new Product(uuidv4(), command.name, command.description, price, command.stock);
    await this.productRepository.save(product);
    return product;
  }
}
