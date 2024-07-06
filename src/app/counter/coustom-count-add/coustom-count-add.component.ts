import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { channelname, customcount } from 'src/app/counter/state/counter.action';
import { getChannel } from 'src/app/counter/state/counter.seletor';
import { ICounter } from 'src/app/counter/state/counter.state';

@Component({
  selector: 'app-coustom-count-add',
  templateUrl: './coustom-count-add.component.html',
  styleUrls: ['./coustom-count-add.component.scss']
})
export class CoustomCountAddComponent implements OnInit {

  count!:number;
  channelName!:Observable<string>;
  constructor(private store:Store<{counter:ICounter}>) { }

  ngOnInit(): void {
    this.channelName = this.store.select(getChannel);
  }

  onClick(){
    this.count;
    this.store.dispatch(customcount({count: +this.count}));
  }

  changeChannelName(){
    this.store.dispatch(channelname());
  }

}
