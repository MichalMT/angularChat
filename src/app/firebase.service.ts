import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { Message } from './message';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    messagesCollection: AngularFirestoreCollection<Message>;
    messages: Observable<Message[]>;

    constructor(public afs: AngularFirestore) {
        this.messagesCollection = this.afs.collection('messages', ref => ref.orderBy('date'));
        this.messages = this.messagesCollection.valueChanges();
    }

    getMessages(){
        return this.messages;
    }

    newMessage(message: Message){
        this.messagesCollection.add(message);
    }
}
