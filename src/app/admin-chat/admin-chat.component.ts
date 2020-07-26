import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { SocketService } from '../services/socket.service';
@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.scss']
})
export class AdminChatComponent implements OnInit {
  listaChat: any = {
    chats: []
  };
  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;
  private scrollContainer: any;
  innerWidth = 0;
  chatActivo: any = [];
  mostarChat: string = "";
  mostarMenu: string = "";
  chatMostrado: boolean = false;
  mensaje: string = "";

  idChat: string = "";
  constructor(private api: ApiService, private router: Router,
    private socket: Socket, private socketService: SocketService) {
    this.innerWidth = window.innerWidth;
    var user = JSON.parse(localStorage.getItem("user"));
    if (user == null || user == undefined || user == "") {
      localStorage.clear();
      this.router.navigate(['admin-login']);
    } else {

      this.verificarMostrar();
      this.api.getUsers().subscribe(
        (data) => {
          if (data["flag"] == "si") {
            this.listaChat.chats = data["chats"];
            for (let i of this.listaChat.chats) {
              i.nueva = "d-none";
            }
            if (this.listaChat.chats.length > 0) {
              this.cambiarChat(this.listaChat.chats[0].id);
            }
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }


  logOut() {
    localStorage.clear();
    this.router.navigate(['admin-login']);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.verificarMostrar();
  }

  verificarMostrar() {
    if (this.innerWidth <= 767) {
      if (this.chatMostrado) {
        this.mostarChat = "";
        this.mostarMenu = "d-none";
      } else {
        this.mostarChat = "d-none";
        this.mostarMenu = "";
      }
    } else {
      this.mostarChat = "";
      this.mostarMenu = "";
    }
  }

  regresarLista() {
    this.chatMostrado = false;
    this.verificarMostrar();
  }

  ngOnInit(): void {
    this.listenMessage();
    this.listenUsers();
  }

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
  }

  cambiarChat(idUser: string) {
    this.api.getMessages(idUser).subscribe(
      (data) => {
        this.idChat = idUser;
        if (data["flag"] == "si") {
          this.chatActivo = data["messages"];

          for (let i of this.listaChat.chats) {
            if (i.id == this.idChat) {
              i.nueva = "d-none";
            }
          }
        } else {
          this.chatActivo = [];
        }
        this.chatMostrado = true;
        this.verificarMostrar();
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
    if (this.mensaje != "") {
      this.socketService.newMessage(this.mensaje, "false", this.idChat);
      this.api.saveMsg(this.mensaje, "false", this.idChat).subscribe(
        (data) => {
          if (data["flag"] == "si") {
            this.chatActivo.push({
              "fecha": "",
              "isUser": "false",
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

  listenMessage() {
    this.socketService.getMessage("admin").subscribe((data) => {
      if (data["idUser"] == this.idChat) {
        this.chatActivo.push({
          "fecha": "",
          "isUser": "true",
          "msg": data["msg"]
        });
        var bottom = setInterval(() => {
          this.scrollToBottom();
          clearInterval(bottom);
        }, 100);
      } else {
        for (let i of this.listaChat.chats) {
          if (i.id == data["idUser"]) {
            i.nueva = "";
            break;
          }
        }
      }
    });
  }

  listenUsers() {
    this.socketService.getMessage("user").subscribe((data) => {
      console.log(data);
        var encontro = false;
        for (let i of this.listaChat.chats) {
          if (i.id == data["idUser"]) {
            encontro = true;
            break;
          }
        }
        if(!encontro){
          this.listaChat.chats.push({
            "nombre": data["nombre"],
            "id": data["idUser"],
            "nueva": "d-none"
        })
        }
    });
  }
}
