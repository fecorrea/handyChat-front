import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChatComponent } from './chat/chat.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminChatComponent } from './admin-chat/admin-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    AdminLoginComponent,
    AdminChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
