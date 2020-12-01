import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntityWTS from './base/BaseEntityWTS';
import Product from './Product';
import Warehouse from './Warehouse';

export interface IWarehouseProduct {
  warehouseId: number;
  productId: number;
  quantity: number;
}

@Entity()
class WarehouseProduct extends BaseEntityWTS implements IWarehouseProduct {
  @Column()
  quantity: number;

  @Column({ nullable: false })
  warehouseId: number;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.warehouseProducts)
  warehouse: Warehouse;

  @Column({ nullable: false })
  productId: number;

  @ManyToOne(() => Product, (product) => product.warehouseProducts)
  product: Product;
}

export default WarehouseProduct;
