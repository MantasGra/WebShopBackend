import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import BaseEntityWTS from './base/BaseEntityWTS';
import Purchase from './Purchase';
import User from './User';

export interface IPaymentMethod {
  type: string;
  userId: number;
}

@Entity()
class PaymentMethod extends BaseEntityWTS implements IPaymentMethod {
  @Column()
  type: string;

  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.paymentMethods)
  user: User;

  @OneToMany(() => Purchase, (purchase) => purchase.paymentMethod)
  purchases: Purchase[];
}

export default PaymentMethod;
