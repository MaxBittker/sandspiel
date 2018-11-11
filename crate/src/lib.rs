extern crate cfg_if;
extern crate js_sys;
extern crate wasm_bindgen;
extern crate wbg_rand;
extern crate web_sys;

// mod species;
mod utils;

use wasm_bindgen::__rt::core::intrinsics::transmute;
use wasm_bindgen::prelude::*;
// use web_sys::console;

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
    Fire = 6,
    Wood = 7,
    Lava = 8,
    Ice = 9,
    Sink = 10,
    Plant = 11,
    Acid = 12,
    Stone = 13,
    Dust = 14,
    Mite = 15,
}

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
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Cell {
    species: Species,
    ra: u8,
    rb: u8,
    clock: u8,
}

fn rand_dir() -> i32 {
    let i = (js_sys::Math::random() * 1000.0) as i32;
    (i % 3) - 1
}

impl Cell {
    pub fn update(&self, api: SandApi) {
        match self.species {
            Species::Empty => {}
            Species::Wall => {}
            Species::Powder => update_powder(*self, api),
            Species::Dust => update_dust(*self, api),
            Species::Water => update_water(*self, api),
            Species::Stone => update_stone(*self, api),
            Species::Gas => update_gas(*self, api),
            Species::Clone => update_clone(*self, api),
            Species::Fire => update_fire(*self, api),
            Species::Wood => update_wood(*self, api),
            Species::Lava => update_lava(*self, api),
            Species::Ice => update_ice(*self, api),
            Species::Sink => update_sink(*self, api),
            Species::Plant => update_plant(*self, api),
            Species::Acid => update_acid(*self, api),
            Species::Mite => update_mite(*self, api),
        }
    }
}

static EMPTY_CELL: Cell = Cell {
    species: Species::Empty,
    ra: 0,
    rb: 0,
    clock: 0,
};

pub fn update_powder(cell: Cell, mut api: SandApi) {
    let dx = rand_dir();

    let nbr = api.get(0, 1);
    if nbr.species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(0, 1, cell);
    } else if api.get(dx, 1).species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(dx, 1, cell);
    } else if nbr.species == Species::Water {
        api.set(0, 0, nbr);
        api.set(0, 1, cell);
    } else {
        api.set(0, 0, cell);
    }
}

pub fn update_dust(cell: Cell, mut api: SandApi) {
    let dx = rand_dir();

    let nbr = api.get(0, 1);
    if nbr.species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(0, 1, cell);
    } else if nbr.species == Species::Water {
        api.set(0, 0, nbr);
        api.set(0, 1, cell);
    } else if api.get(dx, 1).species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(dx, 1, cell);
    } else {
        api.set(0, 0, cell);
    }
}

pub fn update_stone(cell: Cell, mut api: SandApi) {
    if api.get(-1, -1).species == Species::Stone && api.get(1, -1).species == Species::Stone {
        return;
    }

    let nbr = api.get(0, 1);
    let nbr_species = nbr.species;
    if nbr_species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(0, 1, cell);
    } else if nbr_species == Species::Water || nbr_species == Species::Gas {
        api.set(0, 0, nbr);
        api.set(0, 1, cell);
    } else {
        api.set(0, 0, cell);
    }
}

pub fn update_water(cell: Cell, mut api: SandApi) {
    let dx = rand_dir();
    // i = (js_sys::Math::random() * 100.0) as i32;

    if api.get(0, 1).species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(0, 1, cell);
    } else if api.get(dx, 0).species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(dx, 0, cell);
    } else if api.get(-dx, 0).species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(-dx, 0, cell);
    } else {
        api.set(0, 0, cell);
    }
}

pub fn update_gas(cell: Cell, mut api: SandApi) {
    let dx = rand_dir();
    let dy = rand_dir();

    if api.get(-dx, dy).species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(-dx, dy, cell);
    } else {
        api.set(0, 0, cell);
    }
}
pub fn update_clone(cell: Cell, mut api: SandApi) {
    let mut clone_species = unsafe { transmute(cell.rb as u8) };

    for dx in [-1, 0, 1].iter().cloned() {
        for dy in [-1, 0, 1].iter().cloned() {
            if cell.rb == 0 {
                let nbr_species = api.get(dx, dy).species;
                if nbr_species != Species::Empty
                    && nbr_species != Species::Clone
                    && nbr_species != Species::Wall
                {
                    clone_species = nbr_species;
                    api.set(
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
                if api.get(dx, dy).species == Species::Empty {
                    api.set(
                        dx,
                        dy,
                        Cell {
                            species: clone_species,
                            ra: 80
                                + (js_sys::Math::random() * 30.) as u8
                                + ((cell.clock % 127) as i8 - 60).abs() as u8,
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
pub fn update_fire(cell: Cell, mut api: SandApi) {
    let ra = cell.ra;
    let mut degraded = cell.clone();
    degraded.ra = ra - 2;

    let dx = rand_dir();
    let dy = rand_dir();
    if api.get(dx, dy).species == Species::Gas || api.get(dx, dy).species == Species::Dust {
        api.set(
            dx,
            dy,
            Cell {
                species: Species::Fire,
                ra: (150 + (dx + dy) * 10) as u8,
                rb: 0,
                clock: 0,
            },
        );
    }
    if ra < 5 || api.get(dx, dy).species == Species::Water {
        api.set(0, 0, EMPTY_CELL);
    } else if api.get(dx, -1).species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(dx, -1, degraded);
    } else {
        api.set(0, 0, degraded);
    }
}
pub fn update_lava(cell: Cell, mut api: SandApi) {
    let dx = rand_dir();
    let dy = rand_dir();
    if api.get(dx, dy).species == Species::Gas || api.get(dx, dy).species == Species::Dust {
        api.set(
            dx,
            dy,
            Cell {
                species: Species::Fire,
                ra: (150 + (dx + dy) * 10) as u8,
                rb: 0,
                clock: 0,
            },
        );
    }
    if api.get(dx, dy).species == Species::Water {
        api.set(
            0,
            0,
            Cell {
                species: Species::Stone,
                ra: (150 + (dx + dy) * 10) as u8,
                rb: 0,
                clock: 0,
            },
        );
        api.set(dx, dy, EMPTY_CELL);
    } else if api.get(0, 1).species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(0, 1, cell);
    } else if api.get(dx, 1).species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(dx, 1, cell);
    } else if api.get(dx, 0).species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(dx, 0, cell);
    } else {
        api.set(0, 0, cell);
    }
}
pub fn update_wood(cell: Cell, mut api: SandApi) {
    let rb = cell.rb;

    let dx = rand_dir();
    let dy = rand_dir();
    let nbr_species = api.get(dx, dy).species;
    if rb == 0 && nbr_species == Species::Fire || nbr_species == Species::Lava {
        api.set(
            0,
            0,
            Cell {
                species: Species::Wood,
                ra: cell.ra,
                rb: 90,
                clock: 0,
            },
        );
    }

    if rb > 1 {
        api.set(
            0,
            0,
            Cell {
                species: Species::Wood,
                ra: cell.ra,
                rb: rb - 1,
                clock: 0,
            },
        );
        if rb % 4 == 0 && nbr_species == Species::Empty {
            api.set(
                dx,
                dy,
                Cell {
                    species: Species::Fire,
                    ra: 50,
                    rb: 0,
                    clock: 0,
                },
            )
        }
        if nbr_species == Species::Water {
            api.set(
                0,
                0,
                Cell {
                    species: Species::Wood,
                    ra: 50,
                    rb: 0,
                    clock: 0,
                },
            )
        }
    } else if rb == 1 {
        api.set(
            0,
            0,
            Cell {
                species: Species::Empty,
                ra: cell.ra,
                rb: 90,
                clock: 0,
            },
        );
    }
}
pub fn update_ice(cell: Cell, mut api: SandApi) {
    let dx = rand_dir();
    let dy = rand_dir();
    let i = (js_sys::Math::random() * 100.0) as i32;

    let nbr_species = api.get(dx, dy).species;
    if nbr_species == Species::Fire || nbr_species == Species::Lava {
        api.set(
            0,
            0,
            Cell {
                species: Species::Water,
                ra: cell.ra,
                rb: cell.rb,
                clock: 0,
            },
        );
    } else if nbr_species == Species::Water && i < 10 {
        api.set(
            dx,
            dy,
            Cell {
                species: Species::Ice,
                ra: cell.ra,
                rb: cell.rb,
                clock: 0,
            },
        );
    }
}

pub fn update_plant(cell: Cell, mut api: SandApi) {
    let rb = cell.rb;

    let mut i = (js_sys::Math::random() * 100.0) as i32;
    let dx = rand_dir();
    let dy = rand_dir();
    let nbr_species = api.get(dx, dy).species;
    if rb == 0 && nbr_species == Species::Fire || nbr_species == Species::Lava {
        api.set(
            0,
            0,
            Cell {
                species: Species::Plant,
                ra: cell.ra,
                rb: 20,
                clock: 0,
            },
        );
    }
    if nbr_species == Species::Wood {
        let dx = rand_dir();
        let dy = rand_dir();

        let drift = (i % 15) - 7;
        let newra = (cell.ra as i32 + drift) as u8;
        if api.get(dx, dy).species == Species::Empty {
            api.set(
                dx,
                dy,
                Cell {
                    species: Species::Plant,
                    ra: newra,
                    rb: 0,
                    clock: 0,
                },
            );
        }
    }
    if nbr_species == Species::Water
        && (api.get(-dx, dy).species == Species::Empty
            || api.get(-dx, dy).species == Species::Water)
    {
        i = (js_sys::Math::random() * 100.0) as i32;
        let drift = (i % 15) - 7;
        let newra = (cell.ra as i32 + drift) as u8;
        api.set(
            dx,
            dy,
            Cell {
                ra: newra,
                rb: 0,
                ..cell
            },
        );
        api.set(-dx, dy, EMPTY_CELL);
    }

    if rb > 1 {
        api.set(
            0,
            0,
            Cell {
                ra: cell.ra,
                rb: rb - 1,
                ..cell
            },
        );
        if nbr_species == Species::Empty {
            api.set(
                dx,
                dy,
                Cell {
                    species: Species::Fire,
                    ra: 50,
                    rb: 0,
                    clock: 0,
                },
            )
        }
        if nbr_species == Species::Water {
            api.set(
                0,
                0,
                Cell {
                    ra: 50,
                    rb: 0,
                    ..cell
                },
            )
        }
    } else if rb == 1 {
        api.set(0, 0, EMPTY_CELL);
    }
}
pub fn update_sink(cell: Cell, mut api: SandApi) {
    let dx = rand_dir();
    let dy = rand_dir();
    if api.get(dx, dy).species != Species::Empty {
        api.set(dx, dy, EMPTY_CELL);
        api.set(0, 0, cell);
    }
}

pub fn update_acid(cell: Cell, mut api: SandApi) {
    let dx = rand_dir();

    let ra = cell.ra;
    let mut degraded = cell.clone();
    degraded.ra = ra - 50;
    // i = (js_sys::Math::random() * 100.0) as i32;
    if degraded.ra < 50 {
        degraded = EMPTY_CELL;
    }
    if api.get(0, 1).species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(0, 1, cell);
    } else if api.get(dx, 0).species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(dx, 0, cell);
    } else if api.get(-dx, 0).species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(-dx, 0, cell);
    } else {
        if api.get(0, 1).species != Species::Wall && api.get(0, 1).species != Species::Acid {
            api.set(0, 0, EMPTY_CELL);
            api.set(0, 1, degraded);
        } else if api.get(dx, 0).species != Species::Wall && api.get(dx, 0).species != Species::Acid
        {
            api.set(0, 0, EMPTY_CELL);
            api.set(dx, 0, degraded);
        } else if api.get(-dx, 0).species != Species::Wall
            && api.get(-dx, 0).species != Species::Acid
        {
            api.set(0, 0, EMPTY_CELL);
            api.set(-dx, 0, degraded);
        } else if api.get(0, -1).species != Species::Wall
            && api.get(0, -1).species != Species::Acid
            && api.get(0, -1).species != Species::Empty
        {
            api.set(0, 0, EMPTY_CELL);
            api.set(0, -1, degraded);
        } else {
            api.set(0, 0, cell);
        }
    }
}

pub fn update_mite(cell: Cell, mut api: SandApi) {
    let mut i = (js_sys::Math::random() * 100.0) as i32;
    let mut dx = 0;
    if cell.ra < 20 {
        dx = (cell.ra as i32) - 1;
    }
    let mut dy = 1;
    let mut mite = cell.clone();

    if cell.rb > 1 {
        mite.rb = mite.rb.saturating_sub(1);
        dy = -1;
    }
    let nbr = api.get(dx, dy);

    let sx = (i % 3) - 1;
    i = (js_sys::Math::random() * 1000.0) as i32;
    let sy = (i % 3) - 1;
    let sample = api.get(sx, sy).species;
    if sample == Species::Fire || sample == Species::Lava {
        api.set(0, 0, EMPTY_CELL);
        return;
    }
    if (sample == Species::Plant || sample == Species::Wood) && i > 970 {
        api.set(sx, sy, if i > 990 { cell } else { EMPTY_CELL });
    }
    if sample == Species::Dust {
        api.set(sx, sy, EMPTY_CELL);
        mite.rb = (i % 50) as u8;
    }
    if nbr.species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(dx, dy, mite);
    } else if dy == 1 && i > 800 {
        i = (js_sys::Math::random() * 100.0) as i32;
        let mut ndx = (i % 3) - 1;
        if i < 6 {
            ndx = dx;
        }

        mite.ra = (1 + ndx) as u8;
        mite.rb = (i % 10) as u8;

        api.set(0, 0, mite);
    } else {
        if api.get(-1, 0).species == Species::Mite
            && api.get(1, 0).species == Species::Mite
            && api.get(0, -1).species == Species::Mite
        {
            api.set(0, 0, EMPTY_CELL);
        } else {
            if api.get(0, 1).species == Species::Ice {
                if api.get(dx, 0).species == Species::Empty {
                    api.set(0, 0, EMPTY_CELL);
                    api.set(dx, 0, mite);
                }
            } else {
                api.set(0, 0, mite);
            }
        }
    }
}

#[wasm_bindgen]
pub struct Universe {
    width: i32,
    height: i32,
    cells: Vec<Cell>,
    winds: Vec<Wind>,
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
                )
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

    pub fn paint(&mut self, x: i32, y: i32, size: i32, species: Species) {
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
                if self.get_cell(px, py).species == Species::Empty || species == Species::Empty {
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
                        species: Species::Powder,
                        ra: 80 + (js_sys::Math::random() * 80.) as u8,
                        rb: 0,
                        clock: 0,
                    }
                }
            })
            .collect();
        let winds = (0..width * height)
            .map(|_i| Wind {
                dx: 0.,
                dy: 0.,
                g: 0.,
                a: 0.,
            })
            .collect();
        Universe {
            width,
            height,
            cells,
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
        if cell.species != Species::Wall && api.get(dx, dy).species == Species::Empty {
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
