import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntityWTS from './base/BaseEntityWTS';
import Cart from './Cart';
import PaymentMethod from './PaymentMethod';
import User from './User';

export interface IPurchase {
  date: Date;
  status: string;
}

@Entity()
class Purchase extends BaseEntityWTS {
  @Column()
  date: Date;

  @Column()
  status: string;

  @Column({ nullable: false })
  cartId: number;

  @ManyToOne(() => Cart, (cart) => cart.purchases)
  cart: Cart;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.purchases)
  user: User;

  @Column({ nullable: false })
  paymentMethodId: number;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.purchases)
  paymentMethod: PaymentMethod;
}

export default Purchase;
