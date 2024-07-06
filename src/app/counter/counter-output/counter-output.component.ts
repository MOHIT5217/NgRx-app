import { Icu } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getCounter } from 'src/app/counter/state/counter.seletor';
import { ICounter } from 'src/app/counter/state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit {


  counter$!:Observable<ICounter>;

  // counter!:number;
  
  constructor(private store:Store<{counter: ICounter}>) { }

  ngOnInit(): void {

      this.counter$ = this.store.select('counter');

      // this.store.select(getCounter).subscribe(counter=>{
      //   this.counter = counter;
      //   console.log('Counter Subscription');
        
      // })
  }


}
