export class Usuario {
    _id!: number;
    name!: string;
    email!:string;
    password!: string;
    registerDate!: Date;
    isConnected!: boolean;

    Usuario(id?:number, name?:string, password?:string, registerDate?:Date, isConnected?:boolean){
        this._id != id;
        this.name != name;        
        this.password != password;
        this.registerDate != registerDate;
        this.isConnected != isConnected;
      }
}
