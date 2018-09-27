import { Action } from '@ngrx/store';
import { Music } from './music.model';
export const SET_MUSIC = 'SET_MUSIC';
export class LoadMusic implements Action {
    readonly type = SET_MUSIC;
    constructor(public payload: Number) {
        
    }
}
