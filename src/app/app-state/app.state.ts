import { SHARED_STATE_NAME } from "../shared-state/shared.seletor";
import { sharedReducer } from "../shared-state/shared.reducer";
import { SharedSate } from "../shared-state/shared.state";
import { AUTH_STATE_NAME } from "../auth/auth-state/auth.selector";
import { AuthReducer } from "../auth/auth-state/auth.reducer";

export interface IAppState {
    [SHARED_STATE_NAME]: SharedSate;
}

export const initialAppState = {
    [SHARED_STATE_NAME]:sharedReducer,
    [AUTH_STATE_NAME] : AuthReducer
}

export const appReducer = {
    [SHARED_STATE_NAME]: sharedReducer,
    [AUTH_STATE_NAME] : AuthReducer
}