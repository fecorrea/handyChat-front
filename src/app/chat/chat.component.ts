import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  mostarChat: boolean = false;
  nombre: string = "";
  idUser: string = "";
  chatActivo: any = [];
  mensaje: string = "";
  
  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;
  private scrollContainer: any;
  constructor(private api: ApiService, private socketService: SocketService) { }

  ngOnInit(): void {
  }

  unirse() {
    if (this.nombre != "") {
      this.api.saveUser(this.nombre).subscribe(
        (data) => {
          if (data["flag"] == "si") {
            this.idUser = data["id"];
            this.socketService.newUser(this.idUser, this.nombre);
            this.mostarChat = true;
            this.cargarChat();
            this.listenMessage();
          } else {
            alert("Error con el servidor, intente nuevamente.");
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      alert("Los campos de usuario y contraseña son requeridos, por favor rellénelos.");
    }
  }

  cargarChat() {
    this.api.getMessages(this.idUser).subscribe(
      (data) => {
        if (data["flag"] == "si") {
          this.chatActivo = data["messages"];
        } else {
          this.chatActivo = [];
        }
        this.scrollContainer = this.scrollFrame.nativeElement; 
        var bottom = setInterval(() => {
          this.scrollToBottom();
          clearInterval(bottom);
        }, 200);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  enviarMensaje() {
    if(this.mensaje != ""){
      this.socketService.newMessage(this.mensaje, "true", this.idUser);
      this.api.saveMsg(this.mensaje, "true", this.idUser).subscribe(
        (data) => {
          if (data["flag"] == "si") {
            this.chatActivo.push({
              "fecha": "",
              "isUser": "true",
              "msg": this.mensaje
            });
            this.mensaje = "";
            var bottom = setInterval(() => {
              this.scrollToBottom();
              clearInterval(bottom);
            }, 100);
          } else {
            alert("Error al enviar mensaje, intente nuevamente.");
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight + 100,
      left: 0,
      behavior: 'smooth'
    });
  }
  
  listenMessage(){
    this.socketService.getMessage(this.idUser).subscribe((data) => {
      this.chatActivo.push({
        "fecha": "",
        "isUser": "false",
        "msg": data["msg"]
      });
      var bottom = setInterval(() => {
        this.scrollToBottom();
        clearInterval(bottom);
      }, 100);
    });
  }
}
