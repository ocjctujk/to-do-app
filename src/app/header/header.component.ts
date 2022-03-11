import { Component, OnInit } from '@angular/core';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SignUpService } from '../sign-up/sign-up.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email: string | undefined;
  constructor(private signUpService : SignUpService) { }

  ngOnInit(): void {
    this.signUpService.user.subscribe(data=>{
      this.email = data.email;
    })
  }

}
