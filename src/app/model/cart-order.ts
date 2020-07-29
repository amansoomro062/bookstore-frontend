import { order } from './order';
import { cart } from './cart';


export class CartOrder{
    constructor(public order:order,public carts:cart[]){ }
}