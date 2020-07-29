import { userprofile } from './userprofile';
import { book } from './book';

export class cart{
    constructor(
        public id: number,
        public user: userprofile,
        public book: book,
        public price: number,
        public  quantity: number,
        public totle_price: number,
        public in_cart: boolean
        ){
            
        }
}

