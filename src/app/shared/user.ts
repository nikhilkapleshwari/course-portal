export class User {
  _id: String;
  username: String;
  password: String;
  role: String;

  constructor(username: String,password: String,role: String){
    this.username=username;
    this.password=password;
    this.role=role;
  }
}