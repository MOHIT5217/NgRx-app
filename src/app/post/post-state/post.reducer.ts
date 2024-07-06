import { createReducer, on } from "@ngrx/store"
import { addPost, deletePost, updatePost } from "./post.action"
import { initialState } from "./post.state"



const _postReducer = createReducer(initialState,
    on(addPost, (state, action) => {

        let post = { ...action.post }
        post.id = (state.posts.length + 1).toString();

        return {
            ...state,
            posts: [...state.posts, post]
        }
    }),
    on(updatePost, (state, action) => {
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
    })
)

export function postReducer(state: any, action: any) {
    return _postReducer(state, action)
}