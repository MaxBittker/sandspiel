/* tslint:disable */
export enum Cell {Dead,Alive,}
export class Universe {
free(): void;

 tick(): void;

 width(): number;

 height(): number;

 cells(): number;

static  new(): Universe;

 toggle_cell(arg0: number, arg1: number): void;

}
