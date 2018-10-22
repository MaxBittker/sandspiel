/* tslint:disable */
export enum Species {Empty,Wall,Powder,}
export class Universe {
free(): void;

 tick(): void;

 width(): number;

 height(): number;

 cells(): number;

 paint(arg0: number, arg1: number, arg2: number): void;

static  new(arg0: number, arg1: number): Universe;

}
export class Cell {
free(): void;

}
