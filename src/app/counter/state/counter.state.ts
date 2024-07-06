export interface ICounter {
    counter:number;
    channelName:string;
}

export const initialState:ICounter = {
    counter: 0,
    channelName: "My Channel"
}