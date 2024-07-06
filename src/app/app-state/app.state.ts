import { counterReducer } from "../counter/state/counter.reducer";
import { ICounter } from "../counter/state/counter.state";
import { postReducer } from "../post/post-state/post.reducer";
import { IPostState } from "../post/post-state/post.state";

export interface IAppState {
    counter: ICounter;
    posts : IPostState;
}

export const initialAppState = {
    counter: {},
    posts : {}
}

export const appReducer = {
    counter: counterReducer,
    posts: postReducer
}