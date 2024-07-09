import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { logoutUser } from '../auth/auth-state/auth.action';
import { AuthResponseData } from '../interface/loginresponse';
import { User } from '../interface/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlLogin = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  urlSignup = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  timeoutInterval:any;
  constructor(private http: HttpClient, private store:Store) { }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.urlLogin + environment.AUTH_API_KEY, { email, password, returnSecureToken: true })
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.urlSignup + environment.AUTH_API_KEY, { email, password, returnSecureToken: true });
  }

  formatUser(data: AuthResponseData) {

    const expirationdate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    console.log("expirationdate =>", expirationdate);
    const user = new User(data.email, data.idToken, data.localId, expirationdate);
    return user;
  }

  setUserLocalstorage(user: User) {

    localStorage.setItem("userData", JSON.stringify(user)); //Set user data to localstorage

    this.runTimeoutInterval(user);

  }


  runTimeoutInterval(user: User) {
    //Get timeinterval

    const todayDate = new Date().getTime();
    const expirationdate = user.getExpiration.getTime();
    const timeinterval = expirationdate - todayDate;
    this.timeoutInterval = setTimeout(() => {

      //Logout functionality or get refresh token
      this.store.dispatch(logoutUser());

    }, timeinterval)
  }

  getUserLocalstorage() {

    const userLocalstorageString = localStorage.getItem('userData');
    if (userLocalstorageString) {
      const userData = JSON.parse(userLocalstorageString);
      const user = new User(userData.email, userData.token, userData.localId, new Date(userData.expirationDate));
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  onLogout(){
    localStorage.removeItem('userData');
    if(this.timeoutInterval){
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }

  errorMessage(key: string) {
    console.log(key, "key");

    switch (key) {

      case 'EMAIL_NOT_FOUND':
        return "Email not found.";

      case 'INVALID_PASSWORD':
        return "Invalid Password.";

      case 'USER_DISABLED':
        return "User disabled.";

      case 'INVALID_LOGIN_CREDENTIALS':
        return "Invalid login credentials.";

      case 'EMAIL_EXISTS':
        return "Email already exists.";

      case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
        return "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";

      default:
        return "Unknown Error ! Plase try again.";
    }
  }
}
