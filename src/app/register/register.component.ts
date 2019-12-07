import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.regForm = this.fb.group({
      username: ['', Validators.required], 
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }

  async reg() {
    try {
      const response =  await fetch("/signup", {
          method: "post",
          headers: {
              // "Authorization": `Bearer ${MEDIUM_ACCESS_TOKEN}`,
              "Content-type": "application/json",
              "Accept": "application/json",
              "Accept-Charset": "utf-8"
          },
          body: JSON.stringify({
              username: this.regForm.get('username').value,
              password: this.regForm.get('password').value,
              first_name: this.regForm.get('first_name').value,
              last_name: this.regForm.get('last_name').value
          })
      })
      const responseJSON = await response.json();
      console.log(responseJSON)
  } catch(e) {
      console.log(e)
  }
  }

}
