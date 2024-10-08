import { UserData } from "../interfaces/UserData";

export class UserBuilder {
    private userData: UserData;

    constructor() {
        this.userData = {
            name: "Test User",
            email: "testuser@email.com",
            password: "pass1234"
        }
    }

    withWrongPassword(){
        this.userData.password = "12"
        return this;
    }

    withPassword(pass: string){
        this.userData.password = pass
        return this;
    }

    withEmail(email: string){
        this.userData.email = email
        return this;
    }

    build(){
        return this.userData;
    }

}