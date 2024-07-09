import { createReducer, on } from "@ngrx/store"
import { autoLoginUser, loginSuccess, logoutUser, signupSuccess } from "./auth.action"
import { initialState } from "./auth.state"


const _AuthReducer = createReducer(initialState,
    on(loginSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    }),
    on(signupSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    }),
    on(autoLoginUser, (state) => {
        return {
            ...state
        }
    }),
    on(logoutUser, (state) => {
        return {
            ...state,
            user: null
        }
    })
)

export function AuthReducer(state: any, action: any) {
    
    return _AuthReducer(state, action)
}