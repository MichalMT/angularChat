import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UsernameService } from '../username.service';
import { FirebaseService } from '../firebase.service';
import { Message } from '../message';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked{

    messagesSubscription: Subscription;
    messages: Message[];
    message: Message = {
        date: "",
        username: "",
        message: ""
    }

    constructor(private firebaseService: FirebaseService,
                private usernameService: UsernameService,
                private router: Router) { }

    ngOnInit() {
        this.message.username = this.usernameService.username;

        if(this.message.username == "" || this.message.username == undefined)
        {
            this.router.navigate(['']);
        }

        this.messagesSubscription = this.firebaseService.getMessages().subscribe(messages => {
            this.messages = messages;
            this.scrollToBottom();
        }, error => {
            console.log(error);
        });
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    sendMessage() {
        this.message.date = new Date();
        if(this.message.message != "")
        {
            this.firebaseService.newMessage(this.message);
            this.message.message = "";
        }
    }

    scrollToBottom(): void {
        let elmnt = document.getElementById("scroll");
        elmnt.scrollIntoView(false);
    }

    ngOnDestroy() {
        this.messagesSubscription.unsubscribe();
    }

}
