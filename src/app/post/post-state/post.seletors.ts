import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IPostState } from "./post.state";

const postSeleter = createFeatureSelector<IPostState>('posts')

export const getPost = createSelector(postSeleter, (state)=>{
    return state.posts;
});

export const getPostById = createSelector(postSeleter, (state:IPostState, props:{postId:string})=>{

    const post = state.posts.find(post=>{
            return post.id === props.postId
    });
    return post;
});
