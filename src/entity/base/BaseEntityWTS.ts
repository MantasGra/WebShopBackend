import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import BaseEntity from './BaseEntity';

abstract class BaseEntityWTS extends BaseEntity {
  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;
}

export default BaseEntityWTS;
