import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SocketService {


  constructor(private socket: Socket) { }

  newMessage(msg: string, isUser: string, idUser: string) {
    var data = {
      "msg": msg,
      "isUser": isUser,
      "idUser": idUser
    }
    this.socket.emit('message', data);
  }

  newUser(idUser: string, nombre: string) {
    var data = {
      "idUser": idUser,
      "nombre": nombre
    }
    this.socket.emit('user', data);
  }

  getMessage(eventName: string) {
    return this.socket
      .fromEvent(eventName)
      .pipe(map((data) => data));
  }


}
