import { Column, Entity, OneToMany } from 'typeorm';

import BaseEntityWTS from './base/BaseEntityWTS';
import WarehouseProduct from './WarehouseProduct';

export interface IWarehouse {
  name: string;
  address: string;
}

@Entity()
class Warehouse extends BaseEntityWTS {
  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(
    () => WarehouseProduct,
    (warehouseProduct) => warehouseProduct.warehouse
  )
  warehouseProducts: WarehouseProduct[];
}

export default Warehouse;
