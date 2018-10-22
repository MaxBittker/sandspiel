/* tslint:disable */
export enum Species {Empty,Wall,Powder,}
export class Cell {
free(): void;

}
export class Universe {
free(): void;

 tick(): void;

 width(): number;

 height(): number;

 cells(): number;

static  new(arg0: number, arg1: number): Universe;

}
