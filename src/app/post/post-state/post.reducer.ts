import { createReducer, on } from "@ngrx/store"
import { addPostSuccess, deletePost, loadPostSucces, updatePost, updatePostSuccess } from "./post.action"
import { initialState } from "./post.state"



const _postReducer = createReducer(initialState,
    on(addPostSuccess, (state, action) => {

        let post = { ...action.post }

        return {
            ...state,
            posts: [...state.posts, post]
        }
    }),
    on(updatePostSuccess, (state, action) => {
        console.log(action,"action");
        
        const posts = state.posts.map(post => {
            return post.id === action.post.id ? action.post : post;
        })
        return {
            ...state,
            posts: posts
        }
    }),
    on(deletePost,(state, action)=>{
        const posts = state.posts.filter(post=> {
            return post.id !== action.id;
        })
        return {
            ...state,
            posts: posts
        }
    }),
    on(loadPostSucces, (state, action)=>{
        console.log(state, action);
        
        return {
            ...state,
            posts: action.posts
        }
    })
)

export function postReducer(state: any, action: any) {
    return _postReducer(state, action)
}