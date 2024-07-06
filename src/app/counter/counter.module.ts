

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CounterComponent } from './counter/counter.component';
import { CounterOutputComponent } from './counter-output/counter-output.component';
import { CounterButtonComponent } from './counter-button/counter-button.component';
import { CoustomCountAddComponent } from './coustom-count-add/coustom-count-add.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    { path: '', component: CounterComponent }
]

@NgModule({
    declarations: [
        CounterComponent,
        CounterOutputComponent,
        CounterButtonComponent,
        CoustomCountAddComponent,
    ],
    imports: [CommonModule, FormsModule, RouterModule.forChild(routes)]
})

export class CounterModule {

}