pub mod species;
pub mod universe;
mod utils;

use rand::Rng;
use rand_xoshiro::SplitMix64;
use species::Species;
use universe::UniverseContext;
use wasm_bindgen::prelude::*;

/// An inter-cell force that can ignite cells and move them.
///
/// - `dx` is the x position of the force.
/// - `dy` is the y position of the force.
/// - `pressure` is the "force" of the force; species have a `pressure` threshold above which they are blown.
/// - `density` is a purely-visual attribute of the force that specifies it's darkness.
#[wasm_bindgen]
#[repr(C)]
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Wind {
    dx: u8,
    dy: u8,
    pressure: u8,
    density: u8,
}

/// A cell that has a species and update logic.
///
/// - `ra` is a value, defined by the updation logic that stores state and can pass color data to WebGL.
/// - `rb` is a  secondary `rb`.
/// - `clock` is a field used to ensure that the cell is not updated twice in one tick.
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
    /// Create a new `Cell` with some species
    ///
    /// `ra` is initialized to a random value, for color noise.
    /// `rb` is initialized to zero.
    /// `clock` is initialized to zero.
    #[must_use]
    // TODO: `rng` bad, should take reference instead.
    pub fn new(species: Species, mut rng: SplitMix64) -> Cell {
        Cell {
            species,
            ra: 100 + (rng.gen_range(0..=50)) as u8,
            rb: 0,
            clock: 0,
        }
    }

    /// Updates the `Cell` using the logic defined in `Species::update`
    pub fn update(&self, ctx: &mut UniverseContext) {
        self.species.update(*self, ctx);
    }
}

/// Defines an empty cell (one with `Species::Empty`), that also doesn't have `ra`/ `rb` set
const EMPTY_CELL: Cell = Cell {
    species: Species::Empty,
    ra: 0,
    rb: 0,
    clock: 0,
};
