import { Entity, Column } from 'typeorm';
import BaseEntityWTS from './base/BaseEntityWTS';

@Entity()
class User extends BaseEntityWTS {
  @Column()
  email: string;

  @Column()
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
