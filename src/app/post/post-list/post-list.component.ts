import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interface/post';
import { deletePost } from '../post-state/post.action';
import { getPost, getPostById } from '../post-state/post.seletors';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts!:Observable<Post[]>;

  constructor(private store:Store) { }

  ngOnInit(): void {
    this.posts = this.store.select(getPost);
  }

  deletePost(id:string){
    if(confirm('Are you sure?')){
      console.log(id,"id");
      const _id = id
      this.store.dispatch(deletePost({id}));
    }
    
  }

}
