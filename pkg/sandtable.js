/* tslint:disable */
import * as wasm from './sandtable_bg';

/**
*/
export const Species = Object.freeze({ Empty:0,Wall:1,Powder:2, });

const __wbg_random_86efc8986c8a8805_target = Math.random.bind(Math) || function() {
    throw new Error(`wasm-bindgen: Math.random.bind(Math) does not exist`);
};

export function __wbg_random_86efc8986c8a8805() {
    return __wbg_random_86efc8986c8a8805_target();
}

function freeUniverse(ptr) {

    wasm.__wbg_universe_free(ptr);
}
/**
*/
export class Universe {

    static __wrap(ptr) {
        const obj = Object.create(Universe.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeUniverse(ptr);
    }

    /**
    * @returns {void}
    */
    tick() {
        return wasm.universe_tick(this.ptr);
    }
    /**
    * @returns {number}
    */
    width() {
        return wasm.universe_width(this.ptr);
    }
    /**
    * @returns {number}
    */
    height() {
        return wasm.universe_height(this.ptr);
    }
    /**
    * @returns {number}
    */
    cells() {
        return wasm.universe_cells(this.ptr);
    }
    /**
    * @returns {Universe}
    */
    static new() {
        return Universe.__wrap(wasm.universe_new());
    }
}

function freeCell(ptr) {

    wasm.__wbg_cell_free(ptr);
}
/**
*/
export class Cell {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeCell(ptr);
    }

}

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

