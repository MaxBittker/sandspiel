extern crate cfg_if;
extern crate js_sys;
extern crate wasm_bindgen;
extern crate wbg_rand;

mod utils;

use wasm_bindgen::prelude::*;
// use wbg_rand::{wasm_rng, Rng};

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = performance)]
    fn now() -> f64;
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Species {
    Empty = 0,
    Wall = 1,
    Powder = 2,
}
// type      ra        rb
// 0000.0000|0000.0000|0000.0000
// 24
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
    // fn toggle(&mut self) {
    //     *self = match *self {
    //         Cell::Dead => Cell::Alive,
    //         Cell::Alive => Cell::Dead,
    //     };
    // }
}

static EMPTY_CELL: Cell = Cell {
    species: Species::Empty,
    ra: 40,
    rb: 40,
    clock: 0,
};

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<Cell>,
    generation: u8,
}

#[wasm_bindgen]
impl Universe {
    pub fn tick(&mut self) {
        // let mut next = self.cells.clone();

        for x in 0..self.width {
            for y in 0..self.height {
                let cell = self.get_cell(x, y);
                // let live_neighbors = self.live_neighbor_count(x, y);
                self.update_cell(
                    cell,
                    Universe::get_neighbor_getter(x, y),
                    Universe::get_neighbor_setter(x, y),
                )
                // next[idx] = next_cell;
            }
        }
        self.generation = self.generation.wrapping_add(1);
        // self.cells = next;
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }

    pub fn new(width: u32, height: u32) -> Universe {
        let cells = (0..width * height)
            .map(|i| {
                if js_sys::Math::random() < 0.9 {
                    EMPTY_CELL
                } else {
                    Cell {
                        species: Species::Powder,
                        ra: 50 + (i % 200) as u8,
                        rb: 100,
                        clock: 0,
                    }
                }
            }).collect();

        Universe {
            width,
            height,
            cells,
            generation: 0,
        }
    }

    // pub fn toggle_cell(&mut self, x: u32, y: u32) {
    //     let idx = self.get_index(x, y);
    //     // self.cells[idx].toggle();
    // }
}

//private methods
impl Universe {
    fn get_index(&self, x: u32, y: u32) -> usize {
        (x + (y * self.width)) as usize
    }

    fn get_cell(&self, x: u32, y: u32) -> Cell {
        let i = self.get_index(x, y);
        return self.cells[i];
    }

    fn get_neighbor_getter(x: u32, y: u32) -> impl Fn(&Universe, u32, u32) -> Cell {
        return move |u: &Universe, dx: u32, dy: u32| {
            let nx = x + dx;
            let ny = y + dy;
            if nx > u.width - 1 || ny > u.height - 1 {
                return Cell {
                    species: Species::Wall,
                    ra: 0,
                    rb: 0,
                    clock: u.generation,
                };
            }
            u.get_cell(nx, ny)
        };
    }

    fn get_neighbor_setter(x: u32, y: u32) -> impl Fn(&mut Universe, u32, u32, Cell) -> () {
        return move |u: &mut Universe, dx: u32, dy: u32, v: Cell| {
            let nx = x + dx;
            let ny = y + dy;
            if nx > u.width - 1 || ny > u.height - 1 {
                return;
            }
            let i = u.get_index((nx) % u.width, (ny) % u.height);
            // v.clock += 1;
            u.cells[i] = v;
            u.cells[i].clock = u.cells[i].clock.wrapping_add(1);
        };
    }

    fn update_cell(
        &mut self,
        cell: Cell,
        neighbor_getter: impl Fn(&Universe, u32, u32) -> Cell,
        neighbor_setter: impl Fn(&mut Universe, u32, u32, Cell) -> (),
    ) {
        // let dx: i8 = wasm_rng().gen_range(-1, 1);
        let i = (js_sys::Math::random() * 100.0) as u32;
        let dx = (i % 3) - 1;

        if cell.clock - self.generation == 1 {
            return;
        };

        if cell.species == Species::Powder {
            if neighbor_getter(self, 0, 1).species == Species::Empty {
                neighbor_setter(self, 0, 0, EMPTY_CELL);
                neighbor_setter(self, 0, 1, cell);
            } else if neighbor_getter(self, dx as u32, 1).species == Species::Empty {
                neighbor_setter(self, 0, 0, EMPTY_CELL);
                neighbor_setter(self, dx as u32, 1, cell);
            } else {
                neighbor_setter(self, 0, 0, cell);
            }
        } // neighbor_setter(self, 0, 0, cell);
    }
}
pub fn add_two(a: u32) -> u32 {
    a & 1
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_adds_two() {
        assert_eq!(1, add_two(6));
    }
}
