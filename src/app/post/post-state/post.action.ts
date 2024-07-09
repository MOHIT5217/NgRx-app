import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/interface/post";

const ADD_POST = "[POST ADD PAGE] Add_Post";
const ADD_POST_SUCCESS = "[POST ADD PAGE] Add_Post_Success";
const EDIT_POST = "[POST EDIT PAGE ] Edit_Post";
const EDIT_POST_SUCCESS = "[POST EDIT PAGE ] Edit_Post_Success";
const DELETE_POST = "[POST LIST PAGE] Delete_Post";
const DELETE_POST_SUCCESS = "[POST LIST PAGE] Delete_Post_Success";
const GET_POST = "[POST PAGE] Get_posts";
const GET_POST_SUCCESS = "[POST PAGE] Get_posts_Success";

export const addPost = createAction(ADD_POST, props<{post:Post}>());
export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<{post:Post}>());
export const updatePost = createAction(EDIT_POST, props<{post:Post}>());
export const updatePostSuccess = createAction(EDIT_POST_SUCCESS, props<{post:Post}>());
export const deletePost = createAction(DELETE_POST, props<{id:string}>());
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS);
export const loadPost = createAction(GET_POST);
export const loadPostSucces = createAction(GET_POST_SUCCESS, props<{posts:Post[]}>());