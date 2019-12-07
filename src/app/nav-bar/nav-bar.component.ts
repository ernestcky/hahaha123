import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  providers: [ UserService ]
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: String = null;
  public loginApiUrl = environment.loginApiUrl;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required], 
      password: ['', Validators.required] 
    });
  }

  async login() {
    await this.loginReq();
    console.log(this.userService.isLoggedIn);
  }

  logout(): void {
    this.userService.isLoggedIn = false;
    this.userService.user.logout();
    this.isLoggedIn = this.userService.isLoggedIn;
    console.log(this.userService.isLoggedIn);
  }

  async loginReq() {
    try {
      const response =  await fetch("/login", {
        method: "post",
        headers: {
          // "Authorization": `Bearer ${MEDIUM_ACCESS_TOKEN}`,
          "Content-type": "application/json",
          "Accept": "application/json",
          "Accept-Charset": "utf-8"
        },
        body: JSON.stringify({
          username: this.loginForm.get('username').value,
          password: this.loginForm.get('password').value,
        })
      })
      const responseJSON = await response.json();
      console.log(responseJSON)
      if(responseJSON.response=="success"){
        this.userService.user.id = responseJSON.user_id;
        this.userService.user.username = responseJSON.username;
        this.userService.isLoggedIn = true;
        this.isLoggedIn = this.userService.isLoggedIn;
      }
      console.log(this.userService.user.id, this.userService.user.username)
    } 
    catch(e) {
      console.log(e)
    }
  }

  goReg(): void {
    this.router.navigateByUrl("register");
  }



}
