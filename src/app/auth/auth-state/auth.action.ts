import { createAction, props } from "@ngrx/store";
import { User } from "src/app/interface/user.model";

const LOGIN_START = "[auth page] Login-start";
const LOGIN_SUCCESS = "[auth page] Login-success";
const SIGNUP_START = "[auth page] SIGNUP-start";
const SIGNUP_SUCCESS = "[auth page] SIGNUP-success";
const AUTO_LOGIN_USER = "[auth page] auto-login";
const LOGOUT_ACTION = "[auth page] logout"

export const  loginStart = createAction(LOGIN_START, props<{email:string, password:string}>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{user:User, redirect:boolean}>());
export const signupStart = createAction(SIGNUP_START, props<{email:string, password:string}>());
export const signupSuccess = createAction(SIGNUP_SUCCESS, props<{user:User, redirect:boolean}>());
export const autoLoginUser = createAction(AUTO_LOGIN_USER);
export const logoutUser = createAction(LOGOUT_ACTION)