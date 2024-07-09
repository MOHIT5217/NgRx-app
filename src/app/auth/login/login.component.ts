import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app-state/app.state';
import { loader } from 'src/app/shared-state/shared.action';
import { loginStart } from '../auth-state/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm!:FormGroup;

  constructor(private store:Store<IAppState>, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null,[Validators.email, Validators.required]),
      password: new FormControl(null,[Validators.required])
    })
  }

  onLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.store.dispatch(loginStart({email, password}));
      this.store.dispatch(loader({status:true}));
    }else{
      this.loginForm.markAsTouched();
    }
  }

  getEmailErrors(){
    const email = this.loginForm.get('email') as FormControl;
    if(!email.valid && email.touched && email.errors){
      if(email.errors.required){
        return "Email is required";
      }
      if(email.errors.email){
        return "Email is not correct";
      }
    }
    return null;
  }

}
