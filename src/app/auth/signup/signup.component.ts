import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { retry } from 'rxjs/operators';
import { loader } from 'src/app/shared-state/shared.action';
import { signupStart } from '../auth-state/auth.action';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm!:FormGroup;

  constructor(private store:Store) { }

  ngOnInit(): void {

    this.signUpForm = new FormGroup({
      email: new FormControl(null,[Validators.email, Validators.required]),
      password: new FormControl(null,[Validators.required])
    })
  }

  onSignupFormSubmit(){
    if(!this.signUpForm.valid){
      return;
    }

    console.log(this.signUpForm.value);
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    this.store.dispatch(loader({status:true}));
    this.store.dispatch(signupStart({email, password}));

  }

  getEmailErrors(){
    const email = this.signUpForm.get('email') as FormControl;
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
