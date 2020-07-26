import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  user: string = "";
  pss: string = "";

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if(this.user != "" && this.pss != ""){
      this.api.loginAdmin(this.user, this.pss).subscribe(
        (data) => {
          if (data["flag"] == "si") {
            //guardar en storage y pasar pagina
            localStorage.setItem("user", JSON.stringify(data["admin"]));
            this.router.navigate(['admin-chat']);
          } else if(data["flag"] == "no"){
            alert("Las credenciales ingresadas son incorrectas.");
          } else {
            alert("Error con el servidor, intente nuevamente.");
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }else{
      alert("Los campos de usuario y contraseña son requeridos, por favor rellénelos.");
    }
  }
}
