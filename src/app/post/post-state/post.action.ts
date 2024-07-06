import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/interface/post";

const ADD_POST = "[POST ADD PAGE] Add_Post";
const EDIT_POST = "[POST EDIT PAGE ] Edit_Post"
const DELETE_POST = "[POST LIST PAGE] Delete_Post"

export const addPost = createAction(ADD_POST, props<{post:Post}>());
export const updatePost = createAction(EDIT_POST, props<{post:Post}>());
export const deletePost = createAction(DELETE_POST, props<{id:string}>());