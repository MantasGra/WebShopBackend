import { Entity, Column, BeforeInsert, OneToMany } from 'typeorm';
import { createHash } from 'crypto';

import BaseEntityWTS from './base/BaseEntityWTS';
import Review from './Review';
import PaymentMethod from './PaymentMethod';
import Purchase from './Purchase';
import Cart from './Cart';

export interface IUser {
  email: string;
  password: string;
  name: string;
  surname: string;
  phoneNumber: string;
  address: string;
  birthday: Date;
}

@Entity()
class User extends BaseEntityWTS implements IUser {
  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column()
  birthday: Date;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.user)
  paymentMethods: PaymentMethod[];

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @BeforeInsert()
  hashPassword() {
    this.password = createHash('sha256').update(this.password).digest('hex');
  }
}

export default User;
