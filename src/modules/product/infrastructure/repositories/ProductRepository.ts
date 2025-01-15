import { Product } from '../../domain/entities/Product';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Price } from '../../domain/valueObjects/Price';
import ProductModel from '../persistence/ProductModel';

export class ProductRepository implements IProductRepository {
  async findById(id: string): Promise<Product | null> {
    const productDoc = await ProductModel.findById(id).exec();
    if (!productDoc) return null;
    const price = new Price(productDoc.price, productDoc.currency);
    return new Product(productDoc.id, productDoc.name, productDoc.description, price, productDoc.stock);
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.find().exec();
    return products.map(doc => new Product(doc.id, doc.name, doc.description, new Price(doc.price, doc.currency), doc.stock));
  }

  async save(product: Product): Promise<void> {
    await ProductModel.findByIdAndUpdate(
      product.id,
      {
        name: product.name,
        description: product.description,
        price: product.price.amount,
        currency: product.price.currency,
        stock: product.stock,
      },
      { upsert: true }
    ).exec();
  }

  async delete(id: string): Promise<void> {
    await ProductModel.findByIdAndDelete(id).exec();
  }
}
