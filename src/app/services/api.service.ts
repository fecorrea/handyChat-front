import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  path:string = "http://localhost:3000/";

  constructor(protected http: HttpClient) { }

  getUsers() {
    return this.http.get(this.path + "getUsers");
  }
  getMessages(idUser:string) {
    return this.http.get(this.path + "getMessages?idUser="+idUser);
  }
  

  saveMsg(msg: string, isUser: string, idUser: string){
    return this.http.post(this.path + "saveMsg", {
      "msg":  msg,
      "isUser":  isUser,
      "idUser":  idUser
      });
  }

  saveUser(nombre: string){
    return this.http.post(this.path + "save", {
      "nombre": nombre
      });
  }
  
  loginAdmin(user: string, pss: string){
    return this.http.post(this.path + "login", {
      "user":  user,
      "pss":  pss
      });
  }
}
