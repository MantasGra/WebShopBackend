import { Entity, Column, BeforeInsert } from 'typeorm';
import { createHash } from 'crypto';

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

  @BeforeInsert()
  hashPassword() {
    this.password = createHash('sha256').update(this.password).digest('hex');
  }
}

export default User;
