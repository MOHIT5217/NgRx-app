import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ICounter } from "./counter.state";

const selecterName = createFeatureSelector<ICounter>('counter');

export const  getCounter = createSelector(selecterName, (state)=>{
    return state.counter;
});

export const getChannel = createSelector(selecterName, (state)=>{
    return state.channelName;
})