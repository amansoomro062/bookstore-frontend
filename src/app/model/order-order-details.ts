import { order } from './order';
import { OrderDetails } from './order-details';

export class OrderOrderDetails{
    constructor(public order:order,public orderDetailsList: OrderDetails[]){ }
}


// import { CartDetails } from './order-details';
// import { order } from './order';

// export class OrderCartDetails{
//     constructor(public order:order,public cartDetailsList:CartDetails[]){ }
// }
