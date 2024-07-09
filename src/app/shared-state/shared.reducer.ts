import { createReducer, on } from "@ngrx/store";
import { getErrorMessage, loader } from "./shared.action";
import { initialSate } from "./shared.state";

const _sharedReducer = createReducer(initialSate,
    on(loader, (state, action)=>{
        return {
            ...state,
            showLoading : action.status
        }
    }),
    on(getErrorMessage, (state, action)=>{
        return {
            ...state,
            errorMessage: action.errorMessage
        }
    })
    )

export function sharedReducer(state:any,action:any){
    return _sharedReducer(state,action);
}