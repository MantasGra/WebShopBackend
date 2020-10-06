import { Entity, Column, OneToMany } from 'typeorm';
import BaseEntityWTS from './base/BaseEntityWTS';
import Product from './Product';

export interface ICategory {
  name: string;
  icon: string;
}

@Entity()
class Category extends BaseEntityWTS {
  @Column()
  name: string;

  @Column()
  icon: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}

export default Category;
