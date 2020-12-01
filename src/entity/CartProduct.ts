import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntityWTS from './base/BaseEntityWTS';
import Cart from './Cart';
import Product from './Product';

export interface ICartProduct {
  cartId: number;
  productId: number;
  quantity: number;
}

@Entity()
class CartProduct extends BaseEntityWTS implements ICartProduct {
  @Column()
  quantity: number;

  @Column({ nullable: false })
  productId: number;

  @ManyToOne(() => Product, (product) => product.cartProducts)
  product: Product;

  @Column({ nullable: false })
  cartId: number;

  @ManyToOne(() => Cart, (cart) => cart.cartProducts)
  cart: Cart;
}

export default CartProduct;
