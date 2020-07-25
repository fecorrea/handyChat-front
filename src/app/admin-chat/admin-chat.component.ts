import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.scss']
})
export class AdminChatComponent implements OnInit {

  listaChat: any = {
    "chats": [
      {
        "id": 1,
        "nombre": "Fressia",
        "mensajes": [
          {
            "id": 1,
            "msg": "lorem ipsu",
            "user": true 
          }
        ]
      },
      {
        "id": 2,
        "nombre": "Juanito Arcoiris",
        "mensajes": [
          {
            "id": 2,
            "msg": "lorem ipsu",
            "user": true 
          },
          {
            "id": 3,
            "msg": "lorem ipsu",
            "user": false 
          }
        ]
      }
    ]
  }

  innerWidth = 0;
  chatActivo:any = [];
  mostarChat:string = "";
  mostarMenu:string = "";
  chatMostrado: boolean = false;
  constructor() {
    this.innerWidth = window.innerWidth;
    this.verificarMostrar();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.verificarMostrar();
  }

  verificarMostrar(){
    if(this.innerWidth<=767){
      if(this.chatMostrado){
        this.mostarChat="";
        this.mostarMenu="d-none";
      }else{
        this.mostarChat="d-none";
        this.mostarMenu="";
      }
    }else{
      this.mostarChat="";
      this.mostarMenu="";
    }
  }

  regresarLista(){
    this.chatMostrado = false;
    this.verificarMostrar();
  }

  ngOnInit(): void {
    this.chatActivo = this.listaChat.chats[0].mensajes;
  }

  cambiarChat(idChat:number){
    this.chatActivo = this.listaChat.chats[idChat].mensajes;
    this.chatMostrado = true;
    this.verificarMostrar();
  }
}
