import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { UsernameComponent } from './username/username.component';
import { ChatComponent } from './chat/chat.component';

import { UsernameService } from './username.service';

const routes = [
    { path: '', component: UsernameComponent},
    { path: 'chat', component: ChatComponent },
    { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [
    AppComponent,
    UsernameComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase, 'angular-irc-chat'),
    AngularFirestoreModule

  ],
  providers: [UsernameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
