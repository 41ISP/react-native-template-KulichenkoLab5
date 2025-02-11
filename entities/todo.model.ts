import {create} from 'zustand'
export interface ITodo{
    task: string,
    id: string,
    state: boolean;
}
export interface IStore{
    tasks: ITodo[],
    dobavlenie: (task: ITodo)=> void,
    udalenie: (id: string)=> void,
    tooglesw: (id: string)=> void, 
}
