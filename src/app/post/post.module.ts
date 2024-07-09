import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { PostAddComponent } from "./post-add/post-add.component";
import { PostEditComponent } from "./post-edit/post-edit.component";
import { PostListComponent } from "./post-list/post-list.component";
import { PostEffect } from "./post-state/post.effect";
import { postReducer } from "./post-state/post.reducer";


const routes: Routes = [
    {
        path: '', component: PostListComponent, 
        children: [
            { path: 'add_post', component: PostAddComponent },
            { path: 'edit_post/:id', component: PostEditComponent },
        ]
    }
]

@NgModule({
    declarations: [
        PostListComponent,
        PostAddComponent,
        PostEditComponent,
    ],
    imports: [
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule, 
        EffectsModule.forFeature([PostEffect]),
        StoreModule.forFeature('posts', postReducer),
        RouterModule.forChild(routes)]
})

export class PostModule {

}