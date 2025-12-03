export default class AdminInterface {
    constructor({
        name, lastname, email, username, role, password
    }){
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.role = role;
        this.password = password;
    }
}