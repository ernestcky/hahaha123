import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

class User {
  id: any;
  username: string;
  constructor(id, username) {
    this.id = id;
    this.username = username;
  }
  logout(): void {
    this.id = null;
    this.username = null;
  }
}

export class UserService {
  isLoggedIn: boolean = false;
  user: User;
  constructor() {
    this.user = new User(null, null);
  }
}
