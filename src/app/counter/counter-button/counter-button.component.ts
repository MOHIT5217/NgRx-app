import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrease, increase, reset } from 'src/app/counter/state/counter.action';
import { ICounter } from 'src/app/counter/state/counter.state';

@Component({
  selector: 'app-counter-button',
  templateUrl: './counter-button.component.html',
  styleUrls: ['./counter-button.component.scss']
})
export class CounterButtonComponent implements OnInit {

  constructor(private store:Store<{counter:ICounter}>) { }

  ngOnInit(): void {
  }

  onIncrement(){
    this.store.dispatch(increase());
  } 

  onDecrement(){
    this.store.dispatch(decrease());
  }

  onReset(){
    this.store.dispatch(reset());
  }

  
}
