import { IProductRepository } from '../../../domain/repositories/IProductRepository';

export class DeleteProductHandler {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<void> {
    return this.productRepository.delete(id);
  }

}

