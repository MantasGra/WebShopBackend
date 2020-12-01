import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import BaseEntityWTS from './base/BaseEntityWTS';
import CartProduct from './CartProduct';
import Category from './Category';
import Review from './Review';
import WarehouseProduct from './WarehouseProduct';

export interface IProduct {
  name: string;
  price: number;
  size: string;
  color: string;
  photo: string;
  description: string;
  categoryId: number;
}

@Entity()
class Product extends BaseEntityWTS implements IProduct {
  @Column()
  name: string;

  @Column({ type: 'double' })
  price: number;

  @Column()
  size: string;

  @Column()
  color: string;

  @Column()
  photo: string;

  @Column()
  description: string;

  @Column({ nullable: false })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(
    () => WarehouseProduct,
    (warehouseProduct) => warehouseProduct.product
  )
  warehouseProducts: WarehouseProduct[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product)
  cartProducts: CartProduct[];
}

export default Product;
