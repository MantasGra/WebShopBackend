import { Entity, Column, ManyToOne } from 'typeorm';
import BaseEntityWTS from '../base/BaseEntityWTS';
import User from '../User';

export interface IToken {
  token: string;
  userId: number;
}

@Entity()
class Token extends BaseEntityWTS {
  @Column()
  token: string;

  @Column()
  expiresAt: Date;

  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => User)
  user: User;
}

export default Token;
