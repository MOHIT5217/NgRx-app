import { createAction, props } from "@ngrx/store";

export const increase = createAction('onIncrease');
export const decrease = createAction('onDecrese');
export const reset = createAction('onReset');
export const customcount = createAction('customcount', props<{count:number}>());
export const channelname = createAction('channelname');