import { HttpClient } from "@angular/common/http";
import { flatten } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap, retry } from "rxjs/operators";
import { PostService } from "src/app/services/post.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPost, loadPostSucces, updatePost, updatePostSuccess } from "./post.action";


@Injectable()
export class PostEffect {
    constructor(private actions$: Actions, private http:HttpClient, private postService:PostService, private store:Store){}

    getPosts$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(loadPost),
            mergeMap((action)=>{
                return this.postService.getPostData().pipe(
                    map((posts)=>{
                    return loadPostSucces({posts})
                }));
            })
        )
    });

    addPost$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(addPost),
            mergeMap((action)=>{
                
                return this.postService.addPost(action.post).pipe(
                    map((data)=>{
                        console.log(action);
                        const post = {
                            title: action.post.title,
                            description: action.post.description,
                            id: data.name
                        };
                        return addPostSuccess({post})
                    })
                )
            })
        )
    });

    editPost$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(updatePost),
            mergeMap((action)=>{
                return this.postService.editPost(action.post).pipe(
                    map((data)=>{
                        return updatePostSuccess({post:action.post})
                    })
                )
            })

        )
    });

    deletePost$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(deletePost),
            mergeMap((action)=>{
                return this.postService.deletePost(action.id).pipe(map(
                    (data)=>{
                        return deletePostSuccess();
                    }
                ))
            })
        )
    })
}