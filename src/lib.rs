extern crate js_sys;
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;
// type, ra, rb
// 00000000000000000000000000000000
// 32
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
#[wasm_bindgen]
#[repr(C)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Cell {
    species: Species,
    ra: u8,
    rb: u8,
}

impl Cell {
    // fn toggle(&mut self) {
    //     *self = match *self {
    //         Cell::Dead => Cell::Alive,
    //         Cell::Alive => Cell::Dead,
    //     };
    // }
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<Cell>,
}

#[wasm_bindgen]
impl Universe {
    pub fn tick(&mut self) {
        // let mut next = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width {
                let cell = self.get_cell(row, col);
                // let live_neighbors = self.live_neighbor_count(row, col);
                self.update_cell(
                    cell,
                    Universe::get_neighbor_getter(row, col),
                    Universe::get_neighbor_setter(row, col),
                )
                // next[idx] = next_cell;
            }
        }

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

    pub fn new() -> Universe {
        let width: u32 = 700;
        let height: u32 = 500;

        let cells = (0..width * height)
            .map(|i| {
                if js_sys::Math::random() < 0.5 {
                    Cell {
                        species: Species::Empty,
                        ra: 0,
                        rb: 0,
                    }
                } else {
                    Cell {
                        species: Species::Powder,
                        ra: (i % 255) as u8,
                        rb: 100,
                    }
                }
            }).collect();

        Universe {
            width,
            height,
            cells,
        }
    }

    // pub fn toggle_cell(&mut self, row: u32, column: u32) {
    //     let idx = self.get_index(row, column);
    //     // self.cells[idx].toggle();
    // }
}

//private methods
impl Universe {
    fn get_index(&self, row: u32, column: u32) -> usize {
        ((row * self.width) + column) as usize
    }

    fn get_cell(&self, row: u32, column: u32) -> Cell {
        let i = self.get_index(row, column);
        return self.cells[i];
    }

    fn get_neighbor_getter(row: u32, column: u32) -> impl Fn(&Universe, u32, u32) -> Cell {
        return move |u: &Universe, dx: u32, dy: u32| {
            let y = row + dy;
            let x = column + dx;
            if y > u.height - 1 || x > u.width - 1 {
                return Cell {
                    species: Species::Wall,
                    ra: 0,
                    rb: 0,
                };
            }
            u.get_cell(row + dy, column + dx)
        };
    }

    fn get_neighbor_setter(row: u32, column: u32) -> impl Fn(&mut Universe, u32, u32, Cell) -> () {
        return move |u: &mut Universe, dx: u32, dy: u32, v: Cell| {
            let i = u.get_index((row + dy) % u.height, (column + dx) % u.width);
            u.cells[i] = v;
        };
    }

    fn update_cell(
        &mut self,
        cell: Cell,
        neighbor_getter: impl Fn(&Universe, u32, u32) -> Cell,
        neighbor_setter: impl Fn(&mut Universe, u32, u32, Cell) -> (),
    ) {
        if cell.species == Species::Powder && neighbor_getter(self, 0, 1).species == Species::Empty
        {
            neighbor_setter(
                self,
                0,
                0,
                Cell {
                    species: Species::Empty,
                    ra: 100,
                    rb: 100,
                },
            );
            neighbor_setter(self, 0, 1, cell);
        } else {
            neighbor_setter(self, 0, 0, cell);
        }
        // neighbor_setter(self, 0, 0, cell);
    }
}
