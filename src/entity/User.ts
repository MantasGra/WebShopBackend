import { Entity, Column } from 'typeorm';
import BaseEntityWTS from './base/BaseEntityWTS';

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
}

export default User;
