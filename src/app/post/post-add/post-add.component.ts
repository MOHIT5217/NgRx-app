import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app-state/app.state';
import { Post } from 'src/app/interface/post';
import { addPost } from '../post-state/post.action';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {

  addPostForm!:FormGroup;

  constructor(private store:Store<IAppState>) { }

  ngOnInit(): void {
    this.addPostForm = new FormGroup({
      title: new FormControl(null,[Validators.required, Validators.minLength(5)]),
      description: new FormControl(null,[Validators.required, Validators.minLength(10)])
    })
  }

  onSubmit(){
    if(this.addPostForm.valid){
      const post:Post =  {
        title: this.addPostForm.value.title,
        description: this.addPostForm.value.description
      };
      this.store.dispatch(addPost({post}))
    }else{
      this.addPostForm.markAllAsTouched();
    }
    
  }

  getValidationError(name:string) {
    const titleError = this.addPostForm.get(name) as FormControl;
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

}
