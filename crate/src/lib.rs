extern crate cfg_if;
extern crate js_sys;
extern crate rand;
extern crate rand_xoshiro;
extern crate wasm_bindgen;
extern crate web_sys;

mod species;
mod universe;
mod utils;

use rand::{Rng, SeedableRng};
use rand_xoshiro::SplitMix64;
use species::Species;
use std::collections::VecDeque;
use universe::UniverseContext;
use wasm_bindgen::prelude::*;
// use web_sys::console;

#[wasm_bindgen]
#[repr(C)]
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Wind {
    dx: u8,
    dy: u8,
    pressure: u8,
    density: u8,
}

#[wasm_bindgen]
#[repr(C)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Cell {
    species: Species,
    ra: u8,
    rb: u8,
    clock: u8,
}

impl Cell {
    pub fn new(species: Species) -> Cell {
        Cell {
            species: species,
            ra: 100 + (js_sys::Math::random() * 50.) as u8,
            rb: 0,
            clock: 0,
        }
    }
    pub fn update(&self, ctx: &mut UniverseContext) {
        self.species.update(*self, ctx);
    }
}

static EMPTY_CELL: Cell = Cell {
    species: Species::Empty,
    ra: 0,
    rb: 0,
    clock: 0,
};
