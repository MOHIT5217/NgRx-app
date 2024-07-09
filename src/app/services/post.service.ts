import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "../interface/post";
import { IPostState } from "../post/post-state/post.state";

@Injectable({
    providedIn:'root'
})

export class PostService{

    url = 'https://angular-auth5217-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';

    constructor(private http:HttpClient){}

    getPostData():Observable<Post[]>{
        return this.http.get<Post[]>(this.url).pipe(
            map(data=>{
                const posts = [];
                for(let key in data){
                    if (Object.prototype.hasOwnProperty.call(data, key)){
                        posts.push({
                            ...data[key],
                            id: key
                        })
                    }
                }
                return posts;
            })
        )
    }

    addPost(post:Post):Observable<{name:string}>{
        return this.http.post<{name:string}>(this.url, post)
    }

    editPost(post:Post):Observable<Post>{
        const postData = {[String(post.id)]:{title: post.title, description: post.description}}
        return this.http.patch<Post>(this.url, postData)
    }

    deletePost(id:string){
        return this.http.delete(
            `https://angular-auth5217-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${id}.json`
        )
    }
}