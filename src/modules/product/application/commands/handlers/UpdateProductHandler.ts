import { CreateOrUpdateProductCommand } from '../CreateOrUpdateProductCommand';
import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { Product } from '../../../domain/entities/Product';
import { Price } from '../../../domain/valueObjects/Price';
import { v4 as uuidv4 } from 'uuid';

export class UpdateProductHandler {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string, command: CreateOrUpdateProductCommand): Promise<Product> {
      const price = new Price(command.price, command.currency);
      const product = new Product(id, command.name, command.description, price, command.stock);
       await this.productRepository.save(product);
      return product;
  }

}
