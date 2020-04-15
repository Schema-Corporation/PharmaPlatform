import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: User;
  constructor(public  afAuth:  AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  async login(email: string, password: string) {
    const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return result;
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    const user = JSON.parse(localStorage.getItem('user'));
    return user === null;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
}
