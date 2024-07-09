import { createAction, props } from "@ngrx/store";

const LOADER_START = "[Loader] start";

export const  loader = createAction(LOADER_START, props<{status:boolean}>());

export const getErrorMessage = createAction('[Error Message] error', props<{errorMessage:string}>());