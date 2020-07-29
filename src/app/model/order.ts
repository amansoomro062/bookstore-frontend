export class order {

    constructor(public id: number, public email: string,
        public firstName: string,
        public lastName: string,
        public shippingAddress: string,
        public orderDate: Date,
        public recieveDate: Date,
        public status: string,
        public totlePrice: number,
        //newly added field
        public username: string
        ) {

    }
}
