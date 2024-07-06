import { Post } from "src/app/interface/post"

export interface IPostState {
    posts: Post[]
}

export const initialState:IPostState = {
    posts: [
        {
            id:"1",
            title:"my title",
            description: "sample description"
        },
        {
            id:"2",
            title:"my title",
            description: "sample description"
        }
    ]
}