import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {
  post_id: string;
  private sub: any;
  comments: any;
  postList: any;
  postTitle: any;
  postContent: any;
  replyMsg: string;
  replyForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) { }

  async ngOnInit() {
    this.replyForm = this.fb.group({
      replyMsg: ['', Validators.required]
    });
    this.sub = this.route.params.subscribe(params => {
      this.post_id = params['postid'];
   });
    this.comments = await this.fetchComment(this.post_id.toString(), '1', '100');
    this.postList = await this.fetchLatestPost("1", "100");
    console.log(this.postList)
    for(let i = 0; i < this.postList.length; i++) {
      if(this.postList[i].id == this.post_id){
        this.postTitle = this.postList[i].title;
        this.postContent = this.postList[i].content;
      }
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  back(): void {
    this.router.navigateByUrl("");
  }

  async reply(): Promise<void> {
    // console.log(this.replyForm.get('replyMsg').value);
    this.postNewComment("1", this.post_id.toString() ,this.replyForm.get('replyMsg').value.toString());
    // this.router.navigateByUrl(``);
    // this.router.navigateByUrl(`/discussion/${this.post_id}`);
    this.comments = await this.fetchComment(this.post_id.toString(), '1', '100');
    window.location.reload();
  }

  async fetchComment(post_id, first_n_comment, num_of_comments) {
    try {
      const response =  await fetch('/fetch_comment', {
        method: "post",
        headers: {
          // "Authorization": `Bearer ${MEDIUM_ACCESS_TOKEN}`,
          "Content-type": "application/json",
          "Accept": "application/json",
          "Accept-Charset": "utf-8"
        },
        body: JSON.stringify({
          post_id: post_id,
          first_n_comment: first_n_comment,
          num_of_comments: num_of_comments,
        })
      })
      const responseJSON = await response.json();
      console.log(responseJSON)
      return responseJSON.comments;
    } catch(e) {
        console.log(e)
    }
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

  async postNewComment(user_id, post_id, content) {
    try {
        const response =  await fetch('/post_new_comment', {
            method: "post",
            headers: {
                // "Authorization": `Bearer ${MEDIUM_ACCESS_TOKEN}`,
                "Content-type": "application/json",
                "Accept": "application/json",
                "Accept-Charset": "utf-8"
            },
            body: JSON.stringify({
                user_id: user_id,
                post_id: post_id,
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
