import { Document, Schema, model } from 'mongoose';

interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
}

const ProductSchema = new Schema<IProduct>({
  _id : { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  stock: { type: Number, required: true },
});

export default model<IProduct>('Product', ProductSchema);
