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
    Water = 3,
    Gas = 4,
    Clone = 5,
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

// impl Cell {
// fn toggle(&mut self) {
//     *self = match *self {
//         Cell::Dead => Cell::Alive,

static EMPTY_CELL: Cell = Cell {
    species: Species::Empty,
    ra: 0,
    rb: 0,
    clock: 0,
};

#[wasm_bindgen]
pub struct Universe {
    width: i32,
    height: i32,
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

    pub fn width(&self) -> i32 {
        self.width
    }

    pub fn height(&self) -> i32 {
        self.height
    }

    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }
    pub fn paint(&mut self, x: i32, y: i32, size: i32, species: Species) {
        let radius = size / 2;
        for dx in -radius..radius + 1 {
            for dy in -radius..radius + 1 {
                if dx * dx + dy * dy > radius * radius {
                    continue;
                };
                let px = x + dx;
                let py = y + dy;

                let i = self.get_index(px, py);

                if px < 0 || px > self.width - 1 || py < 0 || py > self.height - 1 {
                    continue;
                }
                if self.get_cell(px, py).species == Species::Empty || species == Species::Empty {
                    self.cells[i] = Cell {
                        species: species,
                        ra: (dx * dy) as u8,
                        rb: 0,
                        clock: self.generation,
                    }
                }
            }
        }
    }
    pub fn new(width: i32, height: i32) -> Universe {
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
            })
            .collect();

        Universe {
            width,
            height,
            cells,
            generation: 0,
        }
    }

    // pub fn toggle_cell(&mut self, x: i32, y: i32) {
    //     let idx = self.get_index(x, y);
    //     // self.cells[idx].toggle();
    // }
}

//private methods
impl Universe {
    fn get_index(&self, x: i32, y: i32) -> usize {
        (x + (y * self.width)) as usize
    }

    fn get_cell(&self, x: i32, y: i32) -> Cell {
        let i = self.get_index(x, y);
        return self.cells[i];
    }

    fn get_neighbor_getter(x: i32, y: i32) -> impl Fn(&Universe, i32, i32) -> Cell {
        return move |u: &Universe, dx: i32, dy: i32| {
            if dx > 2 || dx < -2 || dy > 2 || dy < -2 {
                panic!("oob set");
            }
            let nx = x + dx;
            let ny = y + dy;
            if nx < 0 || nx > u.width - 1 || ny < 0 || ny > u.height - 1 {
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

    fn get_neighbor_setter(x: i32, y: i32) -> impl Fn(&mut Universe, i32, i32, Cell) -> () {
        return move |u: &mut Universe, dx: i32, dy: i32, v: Cell| {
            if dx > 2 || dx < -2 || dy > 2 || dy < -2 {
                panic!("oob set");
            }
            let nx = x + dx;
            let ny = y + dy;

            if nx > u.width - 1 || ny > u.height - 1 {
                return;
            }
            let i = u.get_index((nx) % u.width, (ny) % u.height);
            // v.clock += 1;
            u.cells[i] = v;
            u.cells[i].clock = u.generation.wrapping_add(1);
        };
    }

    fn update_cell(
        &mut self,
        cell: Cell,
        neighbor_getter: impl Fn(&Universe, i32, i32) -> Cell,
        neighbor_setter: impl Fn(&mut Universe, i32, i32, Cell) -> (),
    ) {
        if cell.clock - self.generation == 1 {
            return;
        };

        match cell.species {
            Species::Empty => {}
            Species::Wall => {}
            Species::Powder => {
                let i = (js_sys::Math::random() * 100.0) as i32;
                let dx = (i % 3) - 1;

                if neighbor_getter(self, 0, 1).species == Species::Empty {
                    neighbor_setter(self, 0, 0, EMPTY_CELL);
                    neighbor_setter(self, 0, 1, cell);
                } else if neighbor_getter(self, dx, 1).species == Species::Empty {
                    neighbor_setter(self, 0, 0, EMPTY_CELL);
                    neighbor_setter(self, dx, 1, cell);
                } else {
                    neighbor_setter(self, 0, 0, cell);
                }
            }
            Species::Water => {
                let mut i = (js_sys::Math::random() * 100.0) as i32;
                let dx = (i % 3) - 1;
                // i = (js_sys::Math::random() * 100.0) as i32;

                if neighbor_getter(self, 0, 1).species == Species::Empty {
                    neighbor_setter(self, 0, 0, EMPTY_CELL);
                    neighbor_setter(self, 0, 1, cell);
                } else if neighbor_getter(self, dx, 0).species == Species::Empty {
                    neighbor_setter(self, 0, 0, EMPTY_CELL);
                    neighbor_setter(self, dx, 0, cell);
                } else if neighbor_getter(self, -dx, 0).species == Species::Empty {
                    neighbor_setter(self, 0, 0, EMPTY_CELL);
                    neighbor_setter(self, -dx, 0, cell);
                } else {
                    neighbor_setter(self, 0, 0, cell);
                }
            }
            Species::Gas => {
                let mut i = (js_sys::Math::random() * 100.0) as i32;
                let dx = (i % 3) - 1;
                i = (js_sys::Math::random() * 100.0) as i32;
                let dy = (i % 3) - 1;

                if neighbor_getter(self, dx, dy).species == Species::Empty {
                    neighbor_setter(self, 0, 0, EMPTY_CELL);
                    neighbor_setter(self, dx, dy, cell);
                } else {
                    neighbor_setter(self, 0, 0, cell);
                }
            }
            Species::Clone => {
                let mut clone_species = unsafe { transmute(cell.rb as u8) };

                for dx in [-1, 0, 1].iter().cloned() {
                    for dy in [-1, 0, 1].iter().cloned() {
                        if cell.rb == 0 {
                            let nbr_species = neighbor_getter(self, dx, dy).species;
                            if nbr_species != Species::Empty && nbr_species != Species::Clone {
                                clone_species = nbr_species;
                                neighbor_setter(
                                    self,
                                    0,
                                    0,
                                    Cell {
                                        species: cell.species,
                                        ra: 200,
                                        rb: clone_species as u8,
                                        clock: 0,
                                    },
                                );

                                break;
                            }
                        } else {
                            if neighbor_getter(self, dx, dy).species == Species::Empty {
                                neighbor_setter(
                                    self,
                                    dx,
                                    dy,
                                    Cell {
                                        species: clone_species,
                                        ra: 0,
                                        rb: 0,
                                        clock: 0,
                                    },
                                );
                                break;
                            }
                        }
                    }
                }
            }
        } // neighbor_setter(self, 0, 0, cell);
    }
}
pub fn add_two(a: i32) -> i32 {
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
