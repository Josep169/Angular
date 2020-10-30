import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials : any = {};

  constructor(private loginService:LoginService,private router: Router) { }

  ngOnInit(): void {
  }

  login():void {
    console.log(this.credentials);
    this.loginService.save(this.credentials)
    this.router.navigate(["/companias"])
  }

}