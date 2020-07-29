export class userprofile{

    constructor(
        public username:string,public firstname:string,public lastname:string,
        public gender:string, public address:string,
        public password?:string,
        public roles?: string, public permissions?: string, public active?: number,
        public rolesList?: string[],public permissionsList?: string[]
        ){

    }

}