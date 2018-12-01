import { Component } from '@angular/core';
import { UsernameService } from '../username.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-username',
    templateUrl: './username.component.html',
    styleUrls: ['./username.component.css']
})

export class UsernameComponent {

    constructor(private router: Router,
                private usernameService: UsernameService) { }

    submitUsername(submittedForm){
        if(submittedForm.invalid)
        {
          return;
        }
        this.usernameService.username = submittedForm.value.username;
        this.router.navigate(['chat']);
    }
}
