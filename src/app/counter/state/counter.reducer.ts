import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store"
import { channelname, customcount, decrease, increase, reset } from "./counter.action"
import { initialState } from "./counter.state"

const _counterReducer = createReducer(initialState, 
    on(increase, (state)=>{
    return {
        ...state,
        counter : state.counter+1
    }}),
    on(decrease, (state)=>{
        return {
            ...state,
            counter: state.counter-1
        }
    }),
    on(reset, (state)=>{
        return {
            ...state,
            counter : 0
        }
    }),
    on(customcount, (state, action)=>{
        return {
            ...state,
            counter: state.counter + action.count
        }
    }),
    on(channelname, (state)=>{
        return {
            ...state,
            channelName: "Changed channel name"
        }
    })
    )


export function counterReducer(state:any, action:any){
    return _counterReducer(state, action)
}