import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany
} from 'typeorm';
import BaseEntityWTS from './base/BaseEntityWTS';
import CartProduct from './CartProduct';
import Discount from './Discount';
import Purchase from './Purchase';
import User from './User';

export interface ICart {
  userId: number;
}

@Entity()
class Cart extends BaseEntityWTS {
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product)
  cartProducts: CartProduct[];

  @OneToMany(() => Purchase, (purchase) => purchase.cart)
  purchases: Purchase[];

  @ManyToMany(() => Discount, (discount) => discount.carts)
  @JoinTable()
  discounts: Discount[];
}

export default Cart;
