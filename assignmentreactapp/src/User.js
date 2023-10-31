class User{
    constructor(firstname,address){
        this.firstname=firstname;
        this.address=address;
    }
    firstname = 'Unknown'; //this is binded in state "userdetails.js"
    address = 'Unknown';
}
export default User;