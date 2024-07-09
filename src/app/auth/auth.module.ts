import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const route: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: 'login' },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent }
        ]
    }
]

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        CommonModule, FormsModule,
        ReactiveFormsModule, RouterModule.forChild(route)]
})

export class AuthModule {

}