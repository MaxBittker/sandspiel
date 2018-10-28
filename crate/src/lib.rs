extern crate cfg_if;
extern crate js_sys;
extern crate wasm_bindgen;
extern crate wbg_rand;
extern crate web_sys;

// mod species;
mod utils;

use wasm_bindgen::__rt::core::intrinsics::transmute;
use wasm_bindgen::prelude::*;
use web_sys::console;

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

static EMPTY_CELL: Cell = Cell {
    species: Species::Empty,
    ra: 0,
    rb: 0,
    clock: 0,
};

pub fn update_powder(
    u: &mut Universe,
    cell: Cell,
    wind: Wind,
    neighbor_getter: impl Fn(&Universe, i32, i32) -> Cell,
    neighbor_setter: impl Fn(&mut Universe, i32, i32, Cell) -> (),
) {
    let i = (js_sys::Math::random() * 100.0) as i32;
    let dx = (i % 3) - 1;

    let nbr = neighbor_getter(u, 0, 1);
    if nbr.species == Species::Empty {
        neighbor_setter(u, 0, 0, EMPTY_CELL);
        neighbor_setter(u, 0, 1, cell);
    } else if nbr.species == Species::Water {
        neighbor_setter(u, 0, 0, nbr);
        neighbor_setter(u, 0, 1, cell);
    } else if neighbor_getter(u, dx, 1).species == Species::Empty {
        neighbor_setter(u, 0, 0, EMPTY_CELL);
        neighbor_setter(u, dx, 1, cell);
    } else {
        neighbor_setter(u, 0, 0, cell);
    }
}

pub fn update_water(
    u: &mut Universe,
    cell: Cell,
    wind: Wind,
    neighbor_getter: impl Fn(&Universe, i32, i32) -> Cell,
    neighbor_setter: impl Fn(&mut Universe, i32, i32, Cell) -> (),
) {
    let i = (js_sys::Math::random() * 100.0) as i32;
    let dx = (i % 3) - 1;
    // i = (js_sys::Math::random() * 100.0) as i32;

    if neighbor_getter(u, 0, 1).species == Species::Empty {
        neighbor_setter(u, 0, 0, EMPTY_CELL);
        neighbor_setter(u, 0, 1, cell);
    } else if neighbor_getter(u, dx, 0).species == Species::Empty {
        neighbor_setter(u, 0, 0, EMPTY_CELL);
        neighbor_setter(u, dx, 0, cell);
    } else if neighbor_getter(u, -dx, 0).species == Species::Empty {
        neighbor_setter(u, 0, 0, EMPTY_CELL);
        neighbor_setter(u, -dx, 0, cell);
    } else {
        neighbor_setter(u, 0, 0, cell);
    }
}

pub fn update_gas(
    u: &mut Universe,
    cell: Cell,
    wind: Wind,
    neighbor_getter: impl Fn(&Universe, i32, i32) -> Cell,
    neighbor_setter: impl Fn(&mut Universe, i32, i32, Cell) -> (),
) {
    let mut i = (js_sys::Math::random() * 100.0) as i32;
    let mut dx = (i % 3) - 1;
    i = (js_sys::Math::random() * 100.0) as i32;
    let mut dy = (i % 3) - 1;
    // if wind.dx + 128 > 20 {
    //     dx = 1;
    // }
    // if wind.dy + 128 > 20 {
    //     dy = -1;
    // }
    // if wind.dx + 128 < -20 {
    //     dx = -1;
    // }
    // if wind.dy + 128 < -20 {
    //     dy = 1;
    // }
    if neighbor_getter(u, dx, dy).species == Species::Empty {
        neighbor_setter(u, 0, 0, EMPTY_CELL);
        neighbor_setter(u, dx, dy, cell);
    } else {
        neighbor_setter(u, 0, 0, cell);
    }
}
pub fn update_clone(
    u: &mut Universe,
    cell: Cell,
    wind: Wind,
    neighbor_getter: impl Fn(&Universe, i32, i32) -> Cell,
    neighbor_setter: impl Fn(&mut Universe, i32, i32, Cell) -> (),
) {
    let mut clone_species = unsafe { transmute(cell.rb as u8) };

    for dx in [-1, 0, 1].iter().cloned() {
        for dy in [-1, 0, 1].iter().cloned() {
            if cell.rb == 0 {
                let nbr_species = neighbor_getter(u, dx, dy).species;
                if nbr_species != Species::Empty && nbr_species != Species::Clone {
                    clone_species = nbr_species;
                    neighbor_setter(
                        u,
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
                if neighbor_getter(u, dx, dy).species == Species::Empty {
                    neighbor_setter(
                        u,
                        dx,
                        dy,
                        Cell {
                            species: clone_species,
                            ra: 50,
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
pub fn update_fire(
    u: &mut Universe,
    cell: Cell,
    wind: Wind,
    neighbor_getter: impl Fn(&Universe, i32, i32) -> Cell,
    neighbor_setter: impl Fn(&mut Universe, i32, i32, Cell) -> (),
) {
    let ra = cell.ra;
    let mut degraded = cell.clone();
    degraded.ra = ra - 2;

    let mut i = (js_sys::Math::random() * 100.0) as i32;
    let dx = (i % 3) - 1;
    i = (js_sys::Math::random() * 100.0) as i32;
    let dy = (i % 3) - 1;
    if neighbor_getter(u, dx, dy).species == Species::Gas {
        neighbor_setter(
            u,
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
    if ra < 5 || neighbor_getter(u, dx, dy).species == Species::Water {
        neighbor_setter(u, 0, 0, EMPTY_CELL);
    } else if neighbor_getter(u, dx, -1).species == Species::Empty {
        neighbor_setter(u, 0, 0, EMPTY_CELL);
        neighbor_setter(u, dx, -1, degraded);
    } else {
        neighbor_setter(u, 0, 0, degraded);
    }
}
pub fn update_lava(
    u: &mut Universe,
    cell: Cell,
    wind: Wind,
    neighbor_getter: impl Fn(&Universe, i32, i32) -> Cell,
    neighbor_setter: impl Fn(&mut Universe, i32, i32, Cell) -> (),
) {
    let mut i = (js_sys::Math::random() * 100.0) as i32;
    let dx = (i % 3) - 1;
    i = (js_sys::Math::random() * 100.0) as i32;
    let dy = (i % 3) - 1;
    if neighbor_getter(u, dx, dy).species == Species::Gas {
        neighbor_setter(
            u,
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
    if neighbor_getter(u, dx, dy).species == Species::Water {
        neighbor_setter(
            u,
            0,
            0,
            Cell {
                species: Species::Wall,
                ra: (150 + (dx + dy) * 10) as u8,
                rb: 0,
                clock: 0,
            },
        );
    } else if neighbor_getter(u, 0, 1).species == Species::Empty {
        neighbor_setter(u, 0, 0, EMPTY_CELL);
        neighbor_setter(u, 0, 1, cell);
    } else if neighbor_getter(u, dx, 1).species == Species::Empty {
        neighbor_setter(u, 0, 0, EMPTY_CELL);
        neighbor_setter(u, dx, 1, cell);
    } else if neighbor_getter(u, dx, 0).species == Species::Empty {
        neighbor_setter(u, 0, 0, EMPTY_CELL);
        neighbor_setter(u, dx, 0, cell);
    } else {
        neighbor_setter(u, 0, 0, cell);
    }
}
pub fn update_wood(
    u: &mut Universe,
    cell: Cell,
    wind: Wind,
    neighbor_getter: impl Fn(&Universe, i32, i32) -> Cell,
    neighbor_setter: impl Fn(&mut Universe, i32, i32, Cell) -> (),
) {
    let rb = cell.rb;

    let mut i = (js_sys::Math::random() * 100.0) as i32;
    let dx = (i % 3) - 1;
    i = (js_sys::Math::random() * 100.0) as i32;
    let dy = (i % 3) - 1;
    let nbr_species = neighbor_getter(u, dx, dy).species;
    if rb == 0 && nbr_species == Species::Fire || nbr_species == Species::Lava {
        neighbor_setter(
            u,
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
        neighbor_setter(
            u,
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
            neighbor_setter(
                u,
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
            neighbor_setter(
                u,
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
        neighbor_setter(
            u,
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
pub fn update_ice(
    u: &mut Universe,
    cell: Cell,
    wind: Wind,
    neighbor_getter: impl Fn(&Universe, i32, i32) -> Cell,
    neighbor_setter: impl Fn(&mut Universe, i32, i32, Cell) -> (),
) {
    let mut i = (js_sys::Math::random() * 100.0) as i32;
    let dx = (i % 3) - 1;
    i = (js_sys::Math::random() * 100.0) as i32;
    let dy = (i % 3) - 1;
    let nbr_species = neighbor_getter(u, dx, dy).species;
    if nbr_species == Species::Fire || nbr_species == Species::Lava {
        neighbor_setter(
            u,
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
        neighbor_setter(
            u,
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

pub fn update_plant(
    u: &mut Universe,
    cell: Cell,
    wind: Wind,
    neighbor_getter: impl Fn(&Universe, i32, i32) -> Cell,
    neighbor_setter: impl Fn(&mut Universe, i32, i32, Cell) -> (),
) {
    let rb = cell.rb;

    let mut i = (js_sys::Math::random() * 100.0) as i32;
    let dx = (i % 3) - 1;
    i = (js_sys::Math::random() * 100.0) as i32;
    let dy = (i % 3) - 1;
    let nbr_species = neighbor_getter(u, dx, dy).species;
    if rb == 0 && nbr_species == Species::Fire || nbr_species == Species::Lava {
        neighbor_setter(
            u,
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
        i = (js_sys::Math::random() * 100.0) as i32;
        let dx = (i % 3) - 1;
        i = (js_sys::Math::random() * 100.0) as i32;
        let dy = (i % 3) - 1;
        i = (js_sys::Math::random() * 100.0) as i32;

        let drift = (i % 15) - 7;
        let newra = (cell.ra as i32 + drift) as u8;
        if neighbor_getter(u, dx, dy).species == Species::Empty {
            neighbor_setter(
                u,
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
    if nbr_species == Species::Water && neighbor_getter(u, -dx, dy).species == Species::Empty
        || neighbor_getter(u, -dx, dy).species == Species::Water
    {
        i = (js_sys::Math::random() * 100.0) as i32;
        let drift = (i % 15) - 7;
        let newra = (cell.ra as i32 + drift) as u8;
        neighbor_setter(
            u,
            dx,
            dy,
            Cell {
                species: Species::Plant,
                ra: newra,
                rb: 0,
                clock: 0,
            },
        );
        neighbor_setter(
            u,
            -dx,
            dy,
            Cell {
                species: Species::Empty,
                ra: newra,
                rb: 0,
                clock: 0,
            },
        );
    }

    if rb > 1 {
        neighbor_setter(
            u,
            0,
            0,
            Cell {
                species: Species::Plant,
                ra: cell.ra,
                rb: rb - 1,
                clock: 0,
            },
        );
        if nbr_species == Species::Empty {
            neighbor_setter(
                u,
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
            neighbor_setter(
                u,
                0,
                0,
                Cell {
                    species: Species::Plant,
                    ra: 50,
                    rb: 0,
                    clock: 0,
                },
            )
        }
    } else if rb == 1 {
        neighbor_setter(
            u,
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
pub fn update_sink(
    u: &mut Universe,
    cell: Cell,
    wind: Wind,
    neighbor_getter: impl Fn(&Universe, i32, i32) -> Cell,
    neighbor_setter: impl Fn(&mut Universe, i32, i32, Cell) -> (),
) {
    let mut i = (js_sys::Math::random() * 100.0) as i32;
    let dx = (i % 3) - 1;
    i = (js_sys::Math::random() * 100.0) as i32;
    let dy = (i % 3) - 1;

    if neighbor_getter(u, dx, dy).species != Species::Empty {
        neighbor_setter(u, dx, dy, EMPTY_CELL);
        neighbor_setter(u, 0, 0, cell);
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
                self.blow_wind(
                    cell,
                    wind,
                    Universe::get_neighbor_getter(x, y),
                    Universe::get_neighbor_setter(x, y),
                )
            }
        }
        self.generation = self.generation.wrapping_add(1);

        for x in 0..self.width {
            for y in 0..self.height {
                let cell = self.get_cell(x, y);
                let wind = self.get_wind(x, y);
                self.update_cell(
                    cell,
                    wind,
                    Universe::get_neighbor_getter(x, y),
                    Universe::get_neighbor_setter(x, y),
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
                        ra: 80 + (js_sys::Math::random() * 80.) as u8,
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
                        ra: 50 + (i % 200) as u8,
                        rb: 100,
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
    fn blow_wind(
        &mut self,
        cell: Cell,
        wind: Wind,
        neighbor_getter: impl Fn(&Universe, i32, i32) -> Cell,
        neighbor_setter: impl Fn(&mut Universe, i32, i32, Cell) -> (),
    ) {
        if cell.clock - self.generation == 1 {
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
        if neighbor_getter(self, dx, dy).species == Species::Empty {
            neighbor_setter(self, 0, 0, EMPTY_CELL);
            neighbor_setter(self, dx, dy, cell);
            return;
        } else {
            // neighbor_setter(self, 0, 0, cell);
        }
    }
    fn update_cell(
        &mut self,
        cell: Cell,
        wind: Wind,
        neighbor_getter: impl Fn(&Universe, i32, i32) -> Cell,
        neighbor_setter: impl Fn(&mut Universe, i32, i32, Cell) -> (),
    ) {
        if cell.clock - self.generation == 1 {
            return;
        }

        match cell.species {
            Species::Empty => {}
            Species::Wall => {}
            Species::Powder => update_powder(self, cell, wind, neighbor_getter, neighbor_setter),
            Species::Water => update_water(self, cell, wind, neighbor_getter, neighbor_setter),
            Species::Gas => update_gas(self, cell, wind, neighbor_getter, neighbor_setter),
            Species::Clone => update_clone(self, cell, wind, neighbor_getter, neighbor_setter),
            Species::Fire => update_fire(self, cell, wind, neighbor_getter, neighbor_setter),
            Species::Wood => update_wood(self, cell, wind, neighbor_getter, neighbor_setter),
            Species::Lava => update_lava(self, cell, wind, neighbor_getter, neighbor_setter),
            Species::Ice => update_ice(self, cell, wind, neighbor_getter, neighbor_setter),
            Species::Sink => update_sink(self, cell, wind, neighbor_getter, neighbor_setter),
            Species::Plant => update_plant(self, cell, wind, neighbor_getter, neighbor_setter),
        }
    }
}

// pub fn add_two(a: i32) -> i32 {
//     a & 1
// }

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     fn it_adds_two() {
//         assert_eq!(1, add_two(6));
//     }
// }
