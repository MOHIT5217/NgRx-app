import { Post } from "src/app/interface/post"

export interface IPostState {
    posts: Post[]
}

export const initialState:IPostState = {
    posts: []
}