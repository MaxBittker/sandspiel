extern crate cfg_if;
extern crate js_sys;
extern crate rand;
extern crate rand_xoshiro;
extern crate wasm_bindgen;
extern crate web_sys;

mod species;
mod utils;

use rand::{Rng, SeedableRng};
use rand_xoshiro::SplitMix64;
use species::Species;
use std::collections::VecDeque;
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
    pub fn update(&self, api: SandApi) {
        self.species.update(*self, api);
    }
}

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
    undo_stack: VecDeque<Vec<Cell>>,
    winds: Vec<Wind>,
    burns: Vec<Wind>,
    generation: u8,
    rng: SplitMix64,
}

pub struct SandApi<'a> {
    x: i32,
    y: i32,
    universe: &'a mut Universe,
}

impl<'a> SandApi<'a> {
    pub fn get(&mut self, dx: i32, dy: i32) -> Cell {
        if dx > 2 || dx < -2 || dy > 2 || dy < -2 {
            panic!("oob set");
        }
        let nx = self.x + dx;
        let ny = self.y + dy;
        if nx < 0 || nx > self.universe.width - 1 || ny < 0 || ny > self.universe.height - 1 {
            return Cell {
                species: Species::Wall,
                ra: 0,
                rb: 0,
                clock: self.universe.generation,
            };
        }
        self.universe.get_cell(nx, ny)
    }
    pub fn set(&mut self, dx: i32, dy: i32, v: Cell) {
        if dx > 2 || dx < -2 || dy > 2 || dy < -2 {
            panic!("oob set");
        }
        let nx = self.x + dx;
        let ny = self.y + dy;

        if nx < 0 || nx > self.universe.width - 1 || ny < 0 || ny > self.universe.height - 1 {
            return;
        }
        let i = self.universe.get_index(nx, ny);
        // v.clock += 1;
        self.universe.cells[i] = v;
        self.universe.cells[i].clock = self.universe.generation.wrapping_add(1);
    }
    pub fn get_fluid(&mut self) -> Wind {
        let idx = self.universe.get_index(self.x, self.y);

        self.universe.winds[idx]
    }
    pub fn set_fluid(&mut self, v: Wind) {
        let idx = self.universe.get_index(self.x, self.y);

        self.universe.burns[idx] = v;
    }

    pub fn rand_int(&mut self, n: i32) -> i32 {
        self.universe.rng.gen_range(0..n)
    }

    pub fn once_in(&mut self, n: i32) -> bool {
        self.rand_int(n) == 0
    }
    pub fn rand_dir(&mut self) -> i32 {
        let i = self.rand_int(1000);
        (i % 3) - 1
    }
    pub fn rand_dir_2(&mut self) -> i32 {
        let i = self.rand_int(1000);
        if (i % 2) == 0 {
            -1
        } else {
            1
        }
    }

    pub fn rand_vec(&mut self) -> (i32, i32) {
        let i = self.rand_int(2000);
        match i % 9 {
            0 => (1, 1),
            1 => (1, 0),
            2 => (1, -1),
            3 => (0, -1),
            4 => (-1, -1),
            5 => (-1, 0),
            6 => (-1, 1),
            7 => (0, 1),
            _ => (0, 0),
        }
    }

    pub fn rand_vec_8(&mut self) -> (i32, i32) {
        let i = self.rand_int(8);
        match i {
            0 => (1, 1),
            1 => (1, 0),
            2 => (1, -1),
            3 => (0, -1),
            4 => (-1, -1),
            5 => (-1, 0),
            6 => (-1, 1),
            _ => (0, 1),
        }
    }
}

#[wasm_bindgen]
impl Universe {
    pub fn reset(&mut self) {
        for x in 0..self.width {
            for y in 0..self.height {
                let idx = self.get_index(x, y);
                self.cells[idx] = EMPTY_CELL;
            }
        }
    }
    pub fn tick(&mut self) {
        // let mut next = self.cells.clone();
        // let dx = self.winds[(self.width * self.height / 2) as usize].dx;
        // let js: JsValue = (dx).into();
        // console::log_2(&"dx: ".into(), &js);

        for x in 0..self.width {
            for y in 0..self.height {
                let cell = self.get_cell(x, y);
                let wind = self.get_wind(x, y);
                Universe::blow_wind(
                    cell,
                    wind,
                    SandApi {
                        universe: self,
                        x,
                        y,
                    },
                )
            }
        }
        self.generation = self.generation.wrapping_add(1);
        for x in 0..self.width {
            let scanx = if self.generation % 2 == 0 {
                self.width - (1 + x)
            } else {
                x
            };

            for y in 0..self.height {
                let idx = self.get_index(scanx, y);
                let cell = self.get_cell(scanx, y);

                self.burns[idx] = Wind {
                    dx: 0,
                    dy: 0,
                    pressure: 0,
                    density: 0,
                };
                Universe::update_cell(
                    cell,
                    SandApi {
                        universe: self,
                        x: scanx,
                        y,
                    },
                );
            }
        }

        self.generation = self.generation.wrapping_add(1);
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

    pub fn winds(&self) -> *const Wind {
        self.winds.as_ptr()
    }

    pub fn burns(&self) -> *const Wind {
        self.burns.as_ptr()
    }
    pub fn paint(&mut self, x: i32, y: i32, size: i32, species: Species) {
        let size = size;
        let radius: f64 = (size as f64) / 2.0;

        let floor = (radius + 1.0) as i32;
        let ciel = (radius + 1.5) as i32;

        for dx in -floor..ciel {
            for dy in -floor..ciel {
                if (((dx * dx) + (dy * dy)) as f64) > (radius * radius) {
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
                        ra: 60
                            + (size as u8)
                            + (self.rng.gen::<f32>() * 30.) as u8
                            + ((self.generation % 127) as i8 - 60).abs() as u8,
                        rb: 0,
                        clock: self.generation,
                    }
                }
            }
        }
    }

    pub fn push_undo(&mut self) {
        self.undo_stack.push_front(self.cells.clone());
        self.undo_stack.truncate(50);
    }

    pub fn pop_undo(&mut self) {
        let old_state = self.undo_stack.pop_front();
        match old_state {
            Some(state) => self.cells = state,
            None => (),
        };
    }

    pub fn flush_undos(&mut self) {
        self.undo_stack.clear();
    }

    pub fn new(width: i32, height: i32) -> Universe {
        let cells = (0..width * height).map(|_i| EMPTY_CELL).collect();
        let winds: Vec<Wind> = (0..width * height)
            .map(|_i| Wind {
                dx: 0,
                dy: 0,
                pressure: 0,
                density: 0,
            })
            .collect();

        let burns: Vec<Wind> = (0..width * height)
            .map(|_i| Wind {
                dx: 0,
                dy: 0,
                pressure: 0,
                density: 0,
            })
            .collect();
        let rng: SplitMix64 = SeedableRng::seed_from_u64(0x734f6b89de5f83cc);
        Universe {
            width,
            height,
            cells,
            undo_stack: VecDeque::with_capacity(50),
            burns,
            winds,
            generation: 0,
            rng,
        }
    }
}

//private methods
impl Universe {
    fn get_index(&self, x: i32, y: i32) -> usize {
        (x * self.height + y) as usize
    }

    fn get_cell(&self, x: i32, y: i32) -> Cell {
        let i = self.get_index(x, y);
        return self.cells[i];
    }

    fn get_wind(&self, x: i32, y: i32) -> Wind {
        let i = self.get_index(x, y);
        return self.winds[i];
    }

    fn blow_wind(cell: Cell, wind: Wind, mut api: SandApi) {
        if cell.clock - api.universe.generation == 1 {
            return;
        }
        if cell.species == Species::Empty {
            return;
        }
        let mut dx = 0;
        let mut dy = 0;

        let threshold = match cell.species {
            Species::Empty => 500,
            Species::Wall => 500,
            Species::Cloner => 500,

            Species::Stone => 70,
            Species::Wood => 70,

            Species::Plant => 60,
            Species::Lava => 60,
            Species::Ice => 60,

            Species::Fungus => 54,

            Species::Oil => 50,

            // Intentionally left out and covered by the default case
            // Species::Water => 40,
            // Species::Acid => 40,
            Species::Seed => 35,

            Species::Sand => 30,
            Species::Mite => 30,
            Species::Rocket => 30,

            Species::Dust => 10,
            Species::Fire => 5,
            Species::Gas => 5,
            /*
             Some hacked species values exist outside of the enum values.
             Making sure the default case is emitted allows "BELP" to have a defined wind threshold.
             Originally, threshold was a hardcoded value, so this preserves that original glitch behavior.
             See: https://sandspiel.club/#eMlYGC52XIto0NM1WjaJ
            */
            _ => 40,
        };

        let wx = (wind.dy as i32) - 126;
        let wy = (wind.dx as i32) - 126;

        if wx > threshold {
            dx = 1;
        }
        if wy > threshold {
            dy = 1;
        }
        if wx < -threshold {
            dx = -1;
        }
        if wy < -threshold {
            dy = -1;
        }
        if (dx != 0 || dy != 0) && api.get(dx, dy).species == Species::Empty {
            api.set(0, 0, EMPTY_CELL);
            if dy == -1
                && api.get(dx, -2).species == Species::Empty
                && (cell.species == Species::Sand
                    || cell.species == Species::Water
                    || cell.species == Species::Lava
                    || cell.species == Species::Acid
                    || cell.species == Species::Mite
                    || cell.species == Species::Dust
                    || cell.species == Species::Oil
                    || cell.species == Species::Rocket)
            {
                dy = -2;
            }
            api.set(dx, dy, cell);
            return;
        }
    }
    fn update_cell(cell: Cell, api: SandApi) {
        if cell.clock - api.universe.generation == 1 {
            return;
        }

        cell.update(api);
    }
}
