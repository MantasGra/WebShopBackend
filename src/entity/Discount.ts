import { Column, Entity, ManyToMany } from 'typeorm';
import BaseEntityWTS from './base/BaseEntityWTS';
import Cart from './Cart';

interface IDiscount {
  type: string;
  amount: number;
  origin: string;
}

@Entity()
class Discount extends BaseEntityWTS implements IDiscount {
  @Column()
  type: string;

  @Column({ type: 'double' })
  amount: number;

  @Column()
  origin: string;

  @ManyToMany(() => Cart, (cart) => cart.discounts)
  carts: Cart[];
}

export default Discount;
