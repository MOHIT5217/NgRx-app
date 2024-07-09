

export interface SharedSate {
    showLoading:boolean
    errorMessage:string
}

export const initialSate:SharedSate = {
    showLoading : false,
    errorMessage: ''
}