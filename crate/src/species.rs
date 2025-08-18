use crate::{universe::UniverseContext, Cell, Wind, EMPTY_CELL};

use super::utils::{adjacency_left, adjacency_right, join_dy_dx, split_dy_dx};

use std::{cmp::Ordering, mem};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Species {
    Empty = 0,
    Wall = 1,
    Sand = 2,
    Water = 3,
    Stone = 13,
    Ice = 9,
    Gas = 4,
    Cloner = 5,
    // Sink = 10,
    Mite = 15,
    Wood = 7,
    Plant = 11,
    Fungus = 18,
    Seed = 19,
    Fire = 6,
    Lava = 8,
    Acid = 12,
    Dust = 14,
    Oil = 16,
    Rocket = 17,
}

impl Species {
    /// Updates a cell based on it's `Species`
    ///
    /// Requires a `UniverseContext`, initialized to the `Cell`'s position.
    pub fn update(&self, cell: Cell, ctx: &mut UniverseContext) {
        match self {
            Species::Empty => {}
            Species::Wall => {}
            Species::Sand => update_sand(cell, ctx),
            Species::Water => update_water(cell, ctx),
            Species::Gas => update_gas(cell, ctx),
            Species::Cloner => update_cloner(cell, ctx),
            Species::Fire => update_fire(cell, ctx),
            Species::Wood => update_wood(cell, ctx),
            Species::Lava => update_lava(cell, ctx),
            Species::Ice => update_ice(cell, ctx),
            // Species::Sink => update_sink(cell, ctx),
            Species::Plant => update_plant(cell, ctx),
            Species::Acid => update_acid(cell, ctx),
            Species::Stone => update_stone(cell, ctx),
            Species::Dust => update_dust(cell, ctx),
            Species::Mite => update_mite(cell, ctx),
            Species::Oil => update_oil(cell, ctx),
            Species::Rocket => update_rocket(cell, ctx),
            Species::Fungus => update_fungus(cell, ctx),
            Species::Seed => update_seed(cell, ctx),
        }
    }
}

pub fn update_sand(cell: Cell, ctx: &mut UniverseContext) {
    let dx = ctx.rand_vec1(false);

    let nbr = ctx.get(0, 1);
    if nbr.species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(0, 1, cell);
    } else if ctx.get(dx, 1).species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(dx, 1, cell);
    } else if nbr.species == Species::Water
        || nbr.species == Species::Gas
        || nbr.species == Species::Oil
        || nbr.species == Species::Acid
    {
        ctx.set(0, 0, nbr);
        ctx.set(0, 1, cell);
    } else {
        ctx.set(0, 0, cell);
    }
}

pub fn update_dust(cell: Cell, ctx: &mut UniverseContext) {
    let dx = ctx.rand_vec1(true);
    let fluid = ctx.get_fluid();

    if fluid.pressure > 120 {
        ctx.set(
            0,
            0,
            Cell {
                species: Species::Fire,
                ra: (150 + (cell.ra / 10)),
                rb: 0,
                clock: 0,
            },
        );
        ctx.set_fluid(Wind {
            dx: 0,
            dy: 0,
            pressure: 80,
            density: 5,
        });
        return;
    }

    let nbr = ctx.get(0, 1);
    if nbr.species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(0, 1, cell);
    } else if nbr.species == Species::Water {
        ctx.set(0, 0, nbr);
        ctx.set(0, 1, cell);
    } else if ctx.get(dx, 1).species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(dx, 1, cell);
    } else {
        ctx.set(0, 0, cell);
    }
}

pub fn update_stone(cell: Cell, ctx: &mut UniverseContext) {
    if ctx.get(-1, -1).species == Species::Stone && ctx.get(1, -1).species == Species::Stone {
        return;
    }
    let fluid = ctx.get_fluid();

    if fluid.pressure > 120 && ctx.once_in(2) {
        ctx.set(
            0,
            0,
            Cell {
                species: Species::Sand,
                ra: cell.ra,
                rb: 0,
                clock: 0,
            },
        );
        return;
    }

    let nbr = ctx.get(0, 1);
    let nbr_species = nbr.species;
    if nbr_species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(0, 1, cell);
    } else if nbr_species == Species::Water
        || nbr_species == Species::Gas
        || nbr_species == Species::Oil
        || nbr_species == Species::Acid
    {
        ctx.set(0, 0, nbr);
        ctx.set(0, 1, cell);
    } else {
        ctx.set(0, 0, cell);
    }
}

pub fn update_water(cell: Cell, ctx: &mut UniverseContext) {
    let mut dx = ctx.rand_vec1(true);
    let below = ctx.get(0, 1);
    let dx1 = ctx.get(dx, 1);
    // let mut dx0 = ctx.get(dx, 0);
    //fall down
    if below.species == Species::Empty || below.species == Species::Oil {
        ctx.set(0, 0, below);
        let mut ra = cell.ra;
        if ctx.once_in(20) {
            //randomize direction when falling sometimes
            ra = 100 + ctx.rand_int(0..50) as u8;
        }
        ctx.set(0, 1, Cell { ra, ..cell });

        return;
    } else if dx1.species == Species::Empty || dx1.species == Species::Oil {
        //fall diagonally
        ctx.set(0, 0, dx1);
        ctx.set(dx, 1, cell);
        return;
    } else if ctx.get(-dx, 1).species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(-dx, 1, cell);
        return;
    }
    let left = cell.ra % 2 == 0;
    dx = if left { 1 } else { -1 };
    let dx0 = ctx.get(dx, 0);
    let dxd = ctx.get(dx * 2, 0);

    if dx0.species == Species::Empty && dxd.species == Species::Empty {
        // scoot double
        ctx.set(0, 0, dxd);
        ctx.set(2 * dx, 0, Cell { rb: 6, ..cell });
        let (dx, dy) = ctx.rand_vec2(false);
        let nbr = ctx.get(dx, dy);

        // spread opinion
        if nbr.species == Species::Water && nbr.ra % 2 != cell.ra % 2 {
            ctx.set(
                dx,
                dy,
                Cell {
                    ra: cell.ra,
                    ..cell
                },
            )
        }
    } else if dx0.species == Species::Empty || dx0.species == Species::Oil {
        ctx.set(0, 0, dx0);
        ctx.set(dx, 0, Cell { rb: 3, ..cell });
        let (dx, dy) = ctx.rand_vec2(false);
        let nbr = ctx.get(dx, dy);
        if nbr.species == Species::Water && nbr.ra % 2 != cell.ra % 2 {
            ctx.set(
                dx,
                dy,
                Cell {
                    ra: cell.ra,
                    ..cell
                },
            )
        }
    } else if cell.rb == 0 {
        if ctx.get(-dx, 0).species == Species::Empty {
            // bump
            ctx.set(
                0,
                0,
                Cell {
                    ra: (i32::from(cell.ra) + dx) as u8,
                    ..cell
                },
            );
        }
    } else {
        // become less certain (more bumpable)
        ctx.set(
            0,
            0,
            Cell {
                rb: cell.rb - 1,
                ..cell
            },
        );
    }
    // if ctx.once_in(8) {
    //     let (dx, dy) = ctx.rand_vec2(false);
    //     let nbr = ctx.get(dx, dy);
    //     if nbr.species == Species::Water {
    //         if nbr.ra % 2 != cell.ra % 2 {
    //             ctx.set(0, 0, Cell { ra: nbr.ra, ..cell })
    //         }
    //     }
    // }

    // let (dx, dy) = ctx.rand_vec2(false);
    // let nbr = ctx.get(dx, dy);
    // if nbr.species == Species::Water {
    //     if nbr.ra % 2 != cell.ra % 2 && ctx.once_in(2) {
    //         ctx.set(0, 0, Cell { ra: nbr.ra, ..cell })
    //     }
    // }

    // {

    // if ctx.get(-dx, 0).species == Species::Empty {
    //     ctx.set(0, 0, EMPTY_CELL);
    //     ctx.set(-dx, 0, cell);
    // }
}

pub fn update_oil(cell: Cell, ctx: &mut UniverseContext) {
    let rb = cell.rb;
    let (dx, dy) = ctx.rand_vec2(true);

    let mut new_cell = cell;
    let nbr = ctx.get(dx, dy);
    if rb == 0 && nbr.species == Species::Fire
        || nbr.species == Species::Lava
        || (nbr.species == Species::Oil && nbr.rb > 1 && nbr.rb < 20)
    {
        new_cell = Cell {
            species: Species::Oil,
            ra: cell.ra,
            rb: 50,
            clock: 0,
        };
    }

    match rb.cmp(&1) {
        Ordering::Less => (),
        Ordering::Equal => {
            ctx.set(
                0,
                0,
                Cell {
                    species: Species::Empty,
                    ra: cell.ra,
                    rb: 90,
                    clock: 0,
                },
            );
            return;
        }
        Ordering::Greater => {
            new_cell = Cell {
                species: Species::Oil,
                ra: cell.ra,
                rb: rb - 1,
                clock: 0,
            };
            ctx.set_fluid(Wind {
                dx: 0,
                dy: 10,
                pressure: 10,
                density: 180,
            });
            if rb % 4 != 0 && nbr.species == Species::Empty && nbr.species != Species::Water {
                let ra = 20 + ctx.rand_int(0..30) as u8;
                ctx.set(
                    dx,
                    dy,
                    Cell {
                        species: Species::Fire,
                        ra,
                        rb: 0,
                        clock: 0,
                    },
                );
            }
            if nbr.species == Species::Water {
                new_cell = Cell {
                    species: Species::Oil,
                    ra: 50,
                    rb: 0,
                    clock: 0,
                };
            }
        }
    }

    if ctx.get(0, 1).species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(0, 1, new_cell);
    } else if ctx.get(dx, 1).species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(dx, 1, new_cell);
    } else if ctx.get(-dx, 1).species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(-dx, 1, new_cell);
    } else if ctx.get(dx, 0).species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(dx, 0, new_cell);
    } else if ctx.get(-dx, 0).species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(-dx, 0, new_cell);
    } else {
        ctx.set(0, 0, new_cell);
    }
}

pub fn update_gas(cell: Cell, ctx: &mut UniverseContext) {
    let (dx, dy) = ctx.rand_vec2(true);

    let nbr = ctx.get(dx, dy);
    // ctx.set_fluid(Wind {
    //     dx: 0,
    //     dy: 0,
    //     pressure: 5,
    //     density: 0,
    // });
    if cell.rb == 0 {
        ctx.set(0, 0, Cell { rb: 5, ..cell });
    }

    if nbr.species == Species::Empty {
        if cell.rb < 3 {
            //single molecule
            ctx.set(0, 0, EMPTY_CELL);
            ctx.set(dx, dy, cell);
        } else {
            ctx.set(0, 0, Cell { rb: 1, ..cell });
            ctx.set(
                dx,
                dy,
                Cell {
                    rb: cell.rb - 1,
                    ..cell
                },
            );
        }
    } else if (dx != 0 || dy != 0) && nbr.species == Species::Gas && nbr.rb < 4 {
        // if (cell.rb < 2) {
        ctx.set(0, 0, EMPTY_CELL);
        // }
        ctx.set(
            dx,
            dy,
            Cell {
                rb: nbr.rb + cell.rb,
                ..cell
            },
        );
    }
}
// pub fn update_x(cell: Cell, ctx: &mut UniverseContext) {
//     let (dx, dy) = ctx.rand_vec2(false);

//     let nbr = ctx.get(dx, dy);

//     if nbr.species == Species::X {
//         let opposite = ctx.get(-dx, -dy);
//         if opposite.species == Species::Empty {
//             ctx.set(0, 0, EMPTY_CELL);
//             ctx.set(-dx, -dy, cell);
//         }
//     }
// }

pub fn update_cloner(cell: Cell, ctx: &mut UniverseContext) {
    let mut clone_species = unsafe { mem::transmute(cell.rb) };
    let g = ctx.universe_mut().generation();
    for dx in [-1, 0, 1].iter().copied() {
        for dy in [-1, 0, 1].iter().copied() {
            if cell.rb == 0 {
                let nbr_species = ctx.get(dx, dy).species;
                if nbr_species != Species::Empty
                    && nbr_species != Species::Cloner
                    && nbr_species != Species::Wall
                {
                    clone_species = nbr_species;
                    ctx.set(
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
            } else if ctx.rand_int(0..100) > 90 && ctx.get(dx, dy).species == Species::Empty {
                let ra = 80 + ctx.rand_int(0..30) as u8 + ((g % 127) as i8 - 60).unsigned_abs();
                ctx.set(
                    dx,
                    dy,
                    Cell {
                        species: clone_species,
                        ra,
                        rb: 0,
                        clock: 0,
                    },
                );
                break;
            }
        }
    }
}

pub fn update_rocket(cell: Cell, ctx: &mut UniverseContext) {
    // rocket has complicated behavior that is staged piecewise in ra.
    // it would be awesome to diagram the ranges of values and their meaning

    if cell.rb == 0 {
        //initialize
        ctx.set(
            0,
            0,
            Cell {
                ra: 0,
                rb: 100,
                ..cell
            },
        );
        return;
    }

    let clone_species = if cell.rb != 100 {
        unsafe { mem::transmute(cell.rb) }
    } else {
        Species::Sand
    };

    let (sx, sy) = ctx.rand_vec2(true);
    let sample = ctx.get(sx, sy);

    if cell.rb == 100 //the type is unset
        && sample.species != Species::Empty
        && sample.species != Species::Rocket
        && sample.species != Species::Wall
        && sample.species != Species::Cloner
    {
        ctx.set(
            0,
            0,
            Cell {
                ra: 1,
                rb: sample.species as u8, //store the type
                ..cell
            },
        );
        return;
    }

    let ra = cell.ra;

    if ra == 0 {
        //falling (dormant)
        let dx = ctx.rand_vec1(true);
        let nbr = ctx.get(0, 1);
        if nbr.species == Species::Empty {
            ctx.set(0, 0, EMPTY_CELL);
            ctx.set(0, 1, cell);
        } else if ctx.get(dx, 1).species == Species::Empty {
            ctx.set(0, 0, EMPTY_CELL);
            ctx.set(dx, 1, cell);
        } else if nbr.species == Species::Water
            || nbr.species == Species::Gas
            || nbr.species == Species::Oil
            || nbr.species == Species::Acid
        {
            ctx.set(0, 0, nbr);
            ctx.set(0, 1, cell);
        } else {
            ctx.set(0, 0, cell);
        }
    } else if ra == 1 {
        //launch
        ctx.set(0, 0, Cell { ra: 2, ..cell });
    } else if ra == 2 {
        let (mut dx, mut dy) = ctx.rand_vec2(false);
        let nbr = ctx.get(dx, dy);
        if nbr.species != Species::Empty {
            dx *= -1;
            dy *= -1;
        }
        ctx.set(
            0,
            0,
            Cell {
                ra: 100 + join_dy_dx(dx, dy),
                ..cell
            },
        );
    } else if ra > 50 {
        let (dx, dy) = split_dy_dx(cell.ra - 100);

        let nbr = ctx.get(dx, dy * 2);

        if nbr.species == Species::Empty
            || nbr.species == Species::Fire
            || nbr.species == Species::Rocket
        {
            ctx.set(0, 0, Cell::new(clone_species, ctx.universe().rng_cloned()));
            ctx.set(0, dy, Cell::new(clone_species, ctx.universe().rng_cloned()));

            let (ndx, ndy) = match ctx.rand_int(0..100) % 5 {
                0 => adjacency_left((dx, dy)),
                1 => adjacency_right((dx, dy)),
                // 2 => adjacency_right((dx, dy)),
                _ => (dx, dy),
            };
            ctx.set(
                dx,
                dy * 2,
                Cell {
                    ra: 100 + join_dy_dx(ndx, ndy),
                    ..cell
                },
            );
        } else {
            //fizzle
            ctx.set(0, 0, EMPTY_CELL);
        }
    }
}

pub fn update_fire(cell: Cell, ctx: &mut UniverseContext) {
    let ra = cell.ra;
    let mut degraded = cell;
    degraded.ra = ra - (2 + ctx.rand_vec1(true)) as u8;

    let (dx, dy) = ctx.rand_vec2(true);

    ctx.set_fluid(Wind {
        dx: 0,
        dy: 150,
        pressure: 1,
        density: 120,
    });
    if ctx.get(dx, dy).species == Species::Gas || ctx.get(dx, dy).species == Species::Dust {
        ctx.set(
            dx,
            dy,
            Cell {
                species: Species::Fire,
                ra: (150 + (dx + dy) * 10) as u8,
                rb: 0,
                clock: 0,
            },
        );
        ctx.set_fluid(Wind {
            dx: 0,
            dy: 0,
            pressure: 80,
            density: 40,
        });
    }
    if ra < 5 || ctx.get(dx, dy).species == Species::Water {
        ctx.set(0, 0, EMPTY_CELL);
    } else if ctx.get(dx, dy).species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(dx, dy, degraded);
    } else {
        ctx.set(0, 0, degraded);
    }
}

pub fn update_lava(cell: Cell, ctx: &mut UniverseContext) {
    ctx.set_fluid(Wind {
        dx: 0,
        dy: 10,
        pressure: 0,
        density: 60,
    });
    let (dx, dy) = ctx.rand_vec2(true);

    if ctx.get(dx, dy).species == Species::Gas || ctx.get(dx, dy).species == Species::Dust {
        ctx.set(
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
    let sample = ctx.get(dx, dy);
    if sample.species == Species::Water {
        ctx.set(
            0,
            0,
            Cell {
                species: Species::Stone,
                ra: (150 + (dx + dy) * 10) as u8,
                rb: 0,
                clock: 0,
            },
        );
        ctx.set(dx, dy, EMPTY_CELL);
    } else if ctx.get(0, 1).species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(0, 1, cell);
    } else if ctx.get(dx, 1).species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(dx, 1, cell);
    } else if ctx.get(dx, 0).species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(dx, 0, cell);
    } else {
        ctx.set(0, 0, cell);
    }
}

pub fn update_wood(cell: Cell, ctx: &mut UniverseContext) {
    let rb = cell.rb;

    let (dx, dy) = ctx.rand_vec2(true);

    let nbr_species = ctx.get(dx, dy).species;
    if rb == 0 && nbr_species == Species::Fire || nbr_species == Species::Lava {
        ctx.set(
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
        ctx.set(
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
            let ra = 30 + ctx.rand_int(0..60) as u8;
            ctx.set(
                dx,
                dy,
                Cell {
                    species: Species::Fire,
                    ra,
                    rb: 0,
                    clock: 0,
                },
            )
        }
        if nbr_species == Species::Water {
            ctx.set(
                0,
                0,
                Cell {
                    species: Species::Wood,
                    ra: 50,
                    rb: 0,
                    clock: 0,
                },
            );
            ctx.set_fluid(Wind {
                dx: 0,
                dy: 0,
                pressure: 0,
                density: 220,
            });
        }
    } else if rb == 1 {
        ctx.set(
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
pub fn update_ice(cell: Cell, ctx: &mut UniverseContext) {
    let (dx, dy) = ctx.rand_vec2(true);

    let i = ctx.rand_int(0..100);

    let fluid = ctx.get_fluid();

    if fluid.pressure > 120 && ctx.once_in(2) {
        ctx.set(
            0,
            0,
            Cell {
                species: Species::Water,
                ra: cell.ra,
                rb: 0,
                clock: 0,
            },
        );
        return;
    }

    let nbr_species = ctx.get(dx, dy).species;
    if nbr_species == Species::Fire || nbr_species == Species::Lava {
        ctx.set(
            0,
            0,
            Cell {
                species: Species::Water,
                ra: cell.ra,
                rb: cell.rb,
                clock: 0,
            },
        );
    } else if nbr_species == Species::Water && i < 7 {
        ctx.set(
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

pub fn update_plant(cell: Cell, ctx: &mut UniverseContext) {
    let rb = cell.rb;

    let mut i = ctx.rand_int(0..100);
    let (dx, dy) = ctx.rand_vec2(true);

    let nbr_species = ctx.get(dx, dy).species;
    if rb == 0 && nbr_species == Species::Fire || nbr_species == Species::Lava {
        ctx.set(
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
        let (dx, dy) = ctx.rand_vec2(true);

        let drift = (i % 15) - 7;
        let newra = (i32::from(cell.ra) + drift) as u8;
        if ctx.get(dx, dy).species == Species::Empty {
            ctx.set(
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
    if ctx.once_in(5)
        && (nbr_species == Species::Water
            || nbr_species == Species::Fungus
                && (ctx.get(-dx, dy).species == Species::Empty
                    || ctx.get(-dx, dy).species == Species::Water
                    || ctx.get(-dx, dy).species == Species::Fungus))
    {
        i = ctx.rand_int(0..100);
        let drift = (i % 15) - 7;
        let newra = (i32::from(cell.ra) + drift) as u8;
        ctx.set(
            dx,
            dy,
            Cell {
                ra: newra,
                rb: 0,
                ..cell
            },
        );
        ctx.set(-dx, dy, EMPTY_CELL);
    }

    if rb > 1 {
        ctx.set(
            0,
            0,
            Cell {
                ra: cell.ra,
                rb: rb - 1,
                ..cell
            },
        );

        if nbr_species == Species::Empty {
            let ra = 20 + ctx.rand_int(0..30) as u8;
            ctx.set(
                dx,
                dy,
                Cell {
                    species: Species::Fire,
                    ra,
                    rb: 0,
                    clock: 0,
                },
            );
        }
        if nbr_species == Species::Water {
            ctx.set(
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
        ctx.set(0, 0, EMPTY_CELL);
    }
    let ra = cell.ra;
    if ra > 50
        && ctx.get(1, 1).species != Species::Plant
        && ctx.get(-1, 1).species != Species::Plant
    {
        if ctx.get(0, 1).species == Species::Empty {
            let i = ctx.rand_int(0..=100);
            let dec = ctx.rand_int(0..30) - 20;
            if (i + i32::from(ra)) > 165 {
                ctx.set(
                    0,
                    1,
                    Cell {
                        ra: (i32::from(ra) + dec) as u8,
                        ..cell
                    },
                );
            }
        } else {
            ctx.set(
                0,
                0,
                Cell {
                    ra: (ra - 1),
                    ..cell
                },
            );
        }
    }
}

pub fn update_seed(cell: Cell, ctx: &mut UniverseContext) {
    let rb = cell.rb;
    let ra = cell.ra;

    let (dx, dy) = ctx.rand_vec2(true);

    let nbr_species = ctx.get(dx, dy).species;
    if nbr_species == Species::Fire || nbr_species == Species::Lava {
        ctx.set(
            0,
            0,
            Cell {
                species: Species::Fire,
                ra: 5,
                rb: 0,
                clock: 0,
            },
        );
        return;
    }

    if rb == 0 {
        //falling

        let dxf = ctx.rand_vec1(true); //falling dx
        let nbr_species_below = ctx.get(dxf, 1).species;
        if nbr_species_below == Species::Sand
            || nbr_species_below == Species::Plant
            || nbr_species_below == Species::Fungus
        {
            let rb = ctx.rand_int(1..254) as u8;
            ctx.set(0, 0, Cell { rb, ..cell });
            return;
        }

        let nbr = ctx.get(0, 1);
        if nbr.species == Species::Empty {
            ctx.set(0, 0, EMPTY_CELL);
            ctx.set(0, 1, cell);
        } else if ctx.get(dxf, 1).species == Species::Empty {
            ctx.set(0, 0, EMPTY_CELL);
            ctx.set(dxf, 1, cell);
        } else if nbr.species == Species::Water
            || nbr.species == Species::Gas
            || nbr.species == Species::Oil
            || nbr.species == Species::Acid
        {
            ctx.set(0, 0, nbr);
            ctx.set(0, 1, cell);
        } else {
            ctx.set(0, 0, cell);
        }
    } else if ra > 60 {
        //stem
        let dxr = ctx.rand_vec1(true); //raising dx
        if ctx.once_in(4) {
            if (ctx.get(dxr, -1).species == Species::Empty
                || ctx.get(dxr, -1).species == Species::Sand
                || ctx.get(dxr, -1).species == Species::Seed)
                && ctx.get(1, -1).species != Species::Plant
                && ctx.get(-1, -1).species != Species::Plant
            {
                let ra = (i32::from(ra) - ctx.rand_int(0..10)) as u8;
                ctx.set(dxr, -1, Cell { ra, ..cell });
                let ra2 = ctx.rand_int(80..110) as u8;
                ctx.set(
                    0,
                    0,
                    Cell {
                        species: Species::Plant,
                        ra: ra2,
                        rb: 0,
                        clock: 0,
                    },
                )
            } else {
                ctx.set(0, 0, EMPTY_CELL);
            }
        }
    } else if ra > 40 {
        //petals

        let (mdx, mdy) = ctx.rand_vec2(true);

        let (ldx, ldy) = adjacency_left((mdx, mdy));
        let (rdx, rdy) = adjacency_right((mdx, mdy));

        if (ctx.get(mdx, mdy).species == Species::Empty
            || ctx.get(mdx, mdy).species == Species::Plant)
            && (ctx.get(ldx, ldy).species == Species::Empty
                || ctx.get(rdx, rdy).species == Species::Empty)
        {
            let i = ctx.rand_int(0..=100);
            let dec = 9 - ctx.rand_int(0..3);
            if (i + i32::from(ra)) > 100 {
                ctx.set(
                    mdx,
                    mdy,
                    Cell {
                        ra: (i32::from(ra) - dec) as u8,
                        ..cell
                    },
                );
            }
        }
    } else if nbr_species == Species::Water {
        ctx.set(
            dx,
            dy,
            Cell::new(Species::Seed, ctx.universe().rng_cloned()),
        )
    }
}

pub fn update_fungus(cell: Cell, ctx: &mut UniverseContext) {
    let rb = cell.rb;

    let (dx, dy) = ctx.rand_vec2(true);

    let nbr_species = ctx.get(dx, dy).species;
    if rb == 0 && nbr_species == Species::Fire || nbr_species == Species::Lava {
        ctx.set(
            0,
            0,
            Cell {
                species: Species::Fungus,
                ra: cell.ra,
                rb: 10,
                clock: 0,
            },
        );
    }
    let mut i = ctx.rand_int(0..100);

    if nbr_species != Species::Empty
        && nbr_species != Species::Fungus
        && nbr_species != Species::Fire
        && nbr_species != Species::Ice
    {
        let (dx, dy) = ctx.rand_vec2(true);

        let drift = (i % 15) - 7;
        let newra = (i32::from(cell.ra) + drift) as u8;
        if ctx.get(dx, dy).species == Species::Empty {
            ctx.set(
                dx,
                dy,
                Cell {
                    species: Species::Fungus,
                    ra: newra,
                    rb: 0,
                    clock: 0,
                },
            );
        }
    }

    if i > 9
        && nbr_species == Species::Wood
        && ctx.get(-dx, dy).species == Species::Wood
        && ctx.get(dx, -dy).species == Species::Wood
        && ctx.get(dx, dy).ra % 4 != 0
    {
        i = ctx.rand_int(0..100);
        let drift = (i % 15) - 7;
        let newra = (i32::from(cell.ra) + drift) as u8;
        ctx.set(
            dx,
            dy,
            Cell {
                ra: newra,
                rb: 0,
                ..cell
            },
        );
    }

    if rb > 1 {
        ctx.set(
            0,
            0,
            Cell {
                ra: cell.ra,
                rb: rb - 1,
                ..cell
            },
        );
        if nbr_species == Species::Empty {
            let ra = 10 + ctx.rand_int(0..10) as u8;
            ctx.set(
                dx,
                dy,
                Cell {
                    species: Species::Fire,
                    ra,
                    rb: 0,
                    clock: 0,
                },
            )
        }
        if nbr_species == Species::Water {
            ctx.set(
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
        ctx.set(0, 0, EMPTY_CELL);
    }

    let ra = cell.ra;

    if ra > 120 {
        let (mdx, mdy) = ctx.rand_vec2(true);

        let (ldx, ldy) = adjacency_left((mdx, mdy));
        let (rdx, rdy) = adjacency_right((mdx, mdy));
        if ctx.get(mdx, mdy).species == Species::Empty
            && ctx.get(ldx, ldy).species != Species::Fungus
            && ctx.get(rdx, rdy).species != Species::Fungus
        {
            let i = ctx.rand_int(0..=100);
            let dec = 15 - ctx.rand_int(0..20);
            if (i + i32::from(ra)) > 165 {
                ctx.set(
                    mdx,
                    mdy,
                    Cell {
                        ra: (i32::from(ra) - dec) as u8,
                        ..cell
                    },
                );
            }
        }
    }
}

pub fn update_acid(cell: Cell, ctx: &mut UniverseContext) {
    let dx = ctx.rand_vec1(true);

    let ra = cell.ra;
    let mut degraded = cell;
    degraded.ra = ra - 60;
    // i = ctx.rand_int(100);
    if degraded.ra < 80 {
        degraded = EMPTY_CELL;
    }
    if ctx.get(0, 1).species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(0, 1, cell);
    } else if ctx.get(dx, 0).species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(dx, 0, cell);
    } else if ctx.get(-dx, 0).species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(-dx, 0, cell);
    } else if ctx.get(0, 1).species != Species::Wall && ctx.get(0, 1).species != Species::Acid {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(0, 1, degraded);
    } else if ctx.get(dx, 0).species != Species::Wall && ctx.get(dx, 0).species != Species::Acid {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(dx, 0, degraded);
    } else if ctx.get(-dx, 0).species != Species::Wall && ctx.get(-dx, 0).species != Species::Acid {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(-dx, 0, degraded);
    } else if ctx.get(0, -1).species != Species::Wall
        && ctx.get(0, -1).species != Species::Acid
        && ctx.get(0, -1).species != Species::Empty
    {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(0, -1, degraded);
    } else {
        ctx.set(0, 0, cell);
    }
}

pub fn update_mite(cell: Cell, ctx: &mut UniverseContext) {
    let mut i = ctx.rand_int(0..100);
    let mut dx = 0;
    if cell.ra < 20 {
        dx = i32::from(cell.ra) - 1;
    }
    let mut dy = 1;
    let mut mite = cell;

    if cell.rb > 10 {
        // /
        mite.rb = mite.rb.saturating_sub(1);
        dy = -1;
    } else if cell.rb > 1 {
        // \
        mite.rb = mite.rb.saturating_sub(1);
    } else {
        // |
        dx = 0;
    }
    let nbr = ctx.get(dx, dy);

    let sx = (i % 3) - 1;
    i = ctx.rand_int(0..1000);
    let sy = (i % 3) - 1;
    let sample = ctx.get(sx, sy).species;
    if sample == Species::Fire
        || sample == Species::Lava
        || sample == Species::Water
        || sample == Species::Oil
    {
        ctx.set(0, 0, EMPTY_CELL);
        return;
    }
    if (sample == Species::Plant || sample == Species::Wood || sample == Species::Seed) && i > 800 {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(sx, sy, cell);

        return;
    }
    if sample == Species::Dust {
        ctx.set(sx, sy, if i > 800 { cell } else { EMPTY_CELL });
    }

    if nbr.species == Species::Empty {
        ctx.set(0, 0, EMPTY_CELL);
        ctx.set(dx, dy, mite);
    } else if dy == 1 && i > 800 {
        i = ctx.rand_int(0..100);
        let mut ndx = (i % 3) - 1;
        if i < 6 {
            //switch direction
            ndx = dx;
        }

        mite.ra = (1 + ndx) as u8;
        mite.rb = 10 + (i % 10) as u8; //hop height

        ctx.set(0, 0, mite);
    } else if ctx.get(-1, 0).species == Species::Mite
        && ctx.get(1, 0).species == Species::Mite
        && ctx.get(0, -1).species == Species::Mite
    {
        ctx.set(0, 0, EMPTY_CELL);
    } else if ctx.get(0, 1).species == Species::Ice {
        if ctx.get(dx, 0).species == Species::Empty {
            ctx.set(0, 0, EMPTY_CELL);
            ctx.set(dx, 0, mite);
        }
    } else {
        ctx.set(0, 0, mite);
    }
}
