extern crate cfg_if;
extern crate js_sys;
extern crate wasm_bindgen;
extern crate wbg_rand;
extern crate web_sys;

mod species;
mod utils;

use wasm_bindgen::prelude::*;
// use web_sys::console;

#[wasm_bindgen]
#[repr(C)]
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Wind {
    dx: f32,
    dy: f32,
    g: f32,
    a: f32,
}

#[wasm_bindgen]
#[repr(C)]
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Burn {
    dx: i8,
    dy: i8,
    g: i8,
    a: i8,
}

#[wasm_bindgen]
#[repr(C)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Cell {
    species: species::Species,
    ra: u8,
    rb: u8,
    clock: u8,
}

impl Cell {
    pub fn update(&self, api: SandApi) {
        self.species.update(*self, api);
    }
}

static EMPTY_CELL: Cell = Cell {
    species: species::Species::Empty,
    ra: 0,
    rb: 0,
    clock: 0,
};

#[wasm_bindgen]
pub struct Universe {
    width: i32,
    height: i32,
    cells: Vec<Cell>,
    winds: Vec<Wind>,
    burns: Vec<Burn>,
    generation: u8,
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
                species: species::Species::Wall,
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
        let i = self
            .universe
            .get_index((nx) % self.universe.width, (ny) % self.universe.height);
        // v.clock += 1;
        self.universe.cells[i] = v;
        self.universe.cells[i].clock = self.universe.generation.wrapping_add(1);
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
            for y in 0..self.height {
                let cell = self.get_cell(x, y);
                Universe::update_cell(
                    cell,
                    SandApi {
                        universe: self,
                        x,
                        y,
                    },
                );
                let idx = self.get_index(x, self.height - (1 + y));

                if cell.species == species::Species::Fire {
                    self.burns[idx] = Burn {
                        dx: 0,
                        dy: 100,
                        g: 0,
                        a: 0,
                    }
                } else {
                    self.burns[idx] = Burn {
                        dx: 0,
                        dy: 0,
                        g: 0,
                        a: 0,
                    }
                }
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

    pub fn winds(&self) -> *const Wind {
        self.winds.as_ptr()
    }

    pub fn burns(&self) -> *const Burn {
        self.burns.as_ptr()
    }

    pub fn paint(&mut self, x: i32, y: i32, size: i32, species: species::Species) {
        let radius = size / 2;
        for dx in -radius..radius + 1 {
            for dy in -radius..radius + 1 {
                if dx * dx + dy * dy > (radius * radius) - 1 {
                    continue;
                };
                let px = x + dx;
                let py = y + dy;

                let i = self.get_index(px, py);

                if px < 0 || px > self.width - 1 || py < 0 || py > self.height - 1 {
                    continue;
                }
                if self.get_cell(px, py).species == species::Species::Empty
                    || species == species::Species::Empty
                {
                    self.cells[i] = Cell {
                        species: species,
                        ra: 80
                            + (js_sys::Math::random() * 30.) as u8
                            + ((self.generation % 127) as i8 - 60).abs() as u8,
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
                if js_sys::Math::random() < 0.9 || i < width * height / 3 {
                    EMPTY_CELL
                } else {
                    Cell {
                        species: species::Species::Powder,
                        ra: 80 + (js_sys::Math::random() * 80.) as u8,
                        rb: 0,
                        clock: 0,
                    }
                }
            })
            .collect();
        let winds: Vec<Wind> = (0..width * height)
            .map(|_i| Wind {
                dx: 0.,
                dy: 0.,
                g: 0.,
                a: 0.,
            })
            .collect();

        let burns: Vec<Burn> = (0..width * height)
            .map(|_i| Burn {
                dx: 0,
                dy: 0,
                g: 0,
                a: 0,
            })
            .collect();

        Universe {
            width,
            height,
            cells,
            burns,
            winds,
            generation: 0,
        }
    }
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

    fn get_wind(&self, x: i32, y: i32) -> Wind {
        let i = self.get_index(x, (self.height - y) - 1);
        return self.winds[i];
    }

    fn blow_wind(cell: Cell, wind: Wind, mut api: SandApi) {
        if cell.clock - api.universe.generation == 1 {
            return;
        }
        let mut dx = 0;
        let mut dy = 0;
        if wind.dx > 50.0 {
            dx = 1;
        }
        if wind.dy > 50.0 {
            dy = -1;
        }
        if wind.dx < -50.0 {
            dx = -1;
        }
        if wind.dy < -50.0 {
            dy = 1;
        }
        if cell.species != species::Species::Wall
            && cell.species != species::Species::Clone
            && api.get(dx, dy).species == species::Species::Empty
        {
            api.set(0, 0, EMPTY_CELL);
            api.set(dx, dy, cell);
            return;
        } else {
            // api.set(0, 0, cell);
        }
    }
    fn update_cell(cell: Cell, api: SandApi) {
        if cell.clock - api.universe.generation == 1 {
            return;
        }

        cell.update(api);
    }
}
