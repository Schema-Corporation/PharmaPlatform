import { Injectable,NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: User;
  constructor(public  afAuth:  AngularFireAuth,private router: Router,public ngZone: NgZone) {
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', JSON.parse(JSON.stringify(this.afAuth.auth.currentUser)).stsTokenManager.accessToken);
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }
  public getToken(): string {
    return localStorage.getItem('token');
  }
  public saveToken(token: string) {
    localStorage.removeItem('token');
    localStorage.setItem('token', token);
  }
  public saveUser(user) {
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
  }

  async login(email: string, password: string) {
    const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.router.navigateByUrl('/system/branch');
    return result;
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    return user === null;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null)? true : false;
  }
}
