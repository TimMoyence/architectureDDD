import { Price } from '../valueObjects/Price';

export class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string,
    public price: Price,
    public stock: number
  ) {}

  decreaseStock(quantity: number): void {
    if (this.stock < quantity) {
      throw new Error('Stock insuffisant');
    }
    this.stock -= quantity;
  }

  increaseStock(quantity: number): void {
    this.stock += quantity;
  }
}
