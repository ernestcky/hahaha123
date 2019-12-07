import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { map } from 'rxjs/operators';
import { FormGroup, FormControlName, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  providers: [ UserService ]
})

export class MainMenuComponent implements OnInit {
  isLoggedIn: boolean;
  postList: any;
  addPostBool: boolean = false;
  newPostForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  constructor(private http: HttpClient,
              private userService: UserService) { }

  async ngOnInit() {
    this.postList = await this.fetchLatestPost("1", "10");
    console.log(this.postList);
    this.isLoggedIn = this.userService.isLoggedIn;
  }

  addPost(): void {
    if(this.addPostBool == false)
      this.addPostBool = true;
    else
      this.addPostBool = false;
  }

  submit() {
    if(this.newPostForm.get('title').value=="" || this.newPostForm.get('content').value=="") return;
    this.postNewPost("3", this.newPostForm.get('title').value, this.newPostForm.get('content').value);
    console.log(this.newPostForm.get('title').value, this.newPostForm.get('content').value);
    window.location.reload();
  }

  async fetchLatestPost(first_n_post, num_of_posts) {
    try {
        const response =  await fetch('/fetch_latest_post', {
            method: "post",
            headers: {
                // "Authorization": `Bearer ${MEDIUM_ACCESS_TOKEN}`,
                "Content-type": "application/json",
                "Accept": "application/json",
                "Accept-Charset": "utf-8"
            },
            body: JSON.stringify({
                first_n_post: first_n_post,
                num_of_posts: num_of_posts,
            })
        })
        const responseJSON = await response.json();
        console.log(responseJSON)
        return responseJSON.posts;
    } catch(e) {
        console.log(e)
        return;
    }
  }

  async postNewPost(user_id, title, content) {
    try {
        const response =  await fetch("/post_new_post", {
            method: "post",
            headers: {
                // "Authorization": `Bearer ${MEDIUM_ACCESS_TOKEN}`,
                "Content-type": "application/json",
                "Accept": "application/json",
                "Accept-Charset": "utf-8"
            },
            body: JSON.stringify({
                user_id: user_id,
                title: title,
                content: content,
            })
        })
        const responseJSON = await response.json();
        console.log(responseJSON)
    } catch(e) {
        console.log(e)
    }
}
}
