import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedSate } from "./shared.state";

export const SHARED_STATE_NAME = 'shared'

const getSharedSate = createFeatureSelector<SharedSate>(SHARED_STATE_NAME);

export const getLoader = createSelector(getSharedSate, (state)=>{
    return state.showLoading;
});

export const getErrorMessage = createSelector(getSharedSate, (state)=>{
    return state.errorMessage;
})