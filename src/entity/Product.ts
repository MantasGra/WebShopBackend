import { Entity, Column, ManyToOne } from 'typeorm';
import BaseEntityWTS from './base/BaseEntityWTS';
import Category from './Category';

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
class Product extends BaseEntityWTS {
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
}

export default Product;
