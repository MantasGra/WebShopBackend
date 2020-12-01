import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntityWTS from './base/BaseEntityWTS';
import Product from './Product';
import User from './User';

export interface IReview {
  stars: number;
  comment: string;
}

@Entity()
class Review extends BaseEntityWTS {
  @Column({ type: 'double' })
  stars: number;

  @Column()
  comment: string;

  @Column({ nullable: false })
  productId: number;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
}

export default Review;
