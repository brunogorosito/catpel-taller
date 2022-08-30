export default class UserLogged  {
    id : string;
    username : string;
    firstName : string;
    lastName : string;
    email: string;
  
    constructor(id: string, username: string, firstName: string, lastanme: string, email: string) {
      this.id = id;
      this.username = username;
      this.firstName = firstName;
      this.lastName = lastanme;
      this.email = email;
    }
  
  
    public get fullName(): string {
      return this.firstName + " " + this.lastName;
    }
  

  }
