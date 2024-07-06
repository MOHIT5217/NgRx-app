import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter/counter.component';
import { HomeComponent } from './home/home.component';
import { PostAddComponent } from './post/post-add/post-add.component';
import { PostEditComponent } from './post/post-edit/post-edit.component';
import { PostListComponent } from './post/post-list/post-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'post', component: PostListComponent, children: [
      { path: 'add_post', component: PostAddComponent },
      { path: 'edit_post/:id', component: PostEditComponent },
    ]
  },
  { path: 'counter', component: CounterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
