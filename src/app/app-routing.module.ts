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
    path: 'counter', loadChildren: () => import('./counter/counter.module').then((m) => m.CounterModule)
  },
  {
    path: 'post', loadChildren: () => import('./post/post.module').then((m) => m.PostModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
