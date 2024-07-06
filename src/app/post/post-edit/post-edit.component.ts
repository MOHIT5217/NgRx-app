import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/app-state/app.state';
import { Post } from 'src/app/interface/post';
import { updatePost } from '../post-state/post.action';
import { getPostById } from '../post-state/post.seletors';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit, OnDestroy {

  editForm!:FormGroup;
  post!:Post;
  postSubscription!:Subscription;
  constructor(private activatedroute:ActivatedRoute, private store:Store<IAppState>, private router:Router) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(data=>{
      console.log(data.id);
      const postId = data.id;
      this.postSubscription = this.store.select(getPostById, {postId}).subscribe(post=>{
        if(post){
          this.post = post;
        }
        this.editForm = new FormGroup({
          title: new FormControl(post?.title, [Validators.required, Validators.minLength(5)]),
          description: new FormControl(post?.description, [Validators.required, Validators.minLength(10)])
        })
      })
    })
  }

  onEdit(){
    if(this.editForm.valid){
    const post = {
      title: this.editForm.value.title,
      description: this.editForm.value.description,
      id: this.post.id
    };
    this.store.dispatch(updatePost({post}));
    this.router.navigateByUrl('/post')
    }else{
      this.editForm.markAllAsTouched();
    }
    
  }

  getValidationError(name:string) {
    const titleError = this.editForm.get(name) as FormControl;
    if (titleError.touched && titleError.invalid && titleError.errors) {
      if (titleError.errors['required']) {
        return `${name} is required`;
      }
      if (titleError.errors['minlength']) {
        return `Should have a minimum length of ${(name === 'title'? "5": "10")}`;
      }
    }
    return null;
  }
  
  ngOnDestroy(): void {
      if(this.postSubscription){
        console.log("ngOnDestroy");
        
        this.postSubscription.unsubscribe();
      }
  }
}

