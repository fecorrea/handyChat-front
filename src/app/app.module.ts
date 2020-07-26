import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChatComponent } from './chat/chat.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminChatComponent } from './admin-chat/admin-chat.component';
import { ApiService } from './services/api.service';
import { HttpClientModule} from '@angular/common/http';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    AdminLoginComponent,
    AdminChatComponent
  ],
  imports: [
    BrowserModule,    
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
