use std::collections::VecDeque;

use rand::{distributions::uniform::SampleRange, Rng, SeedableRng};
use rand_xoshiro::SplitMix64;
use wasm_bindgen::prelude::wasm_bindgen;

use crate::{species::Species, Cell, Wind, EMPTY_CELL};

/// A `Universe`!
///
/// Contains a 2d rectangle of cells whether cellular automata processes take place; the cornerstone Sandspiel struct.
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

#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
/// Public methods on `Universe`, many of these are called by JS
impl Universe {
    /// Create a new `Universe`.
    ///
    /// `width` and `height` must both be positive. Note that the larger these get, the more computations are done per frame.
    pub fn new(width: i32, height: i32) -> Universe {
        let cells = vec![EMPTY_CELL; (width * height) as usize];

        let empty_wind = Wind {
            dx: 0,
            dy: 0,
            pressure: 0,
            density: 0,
        };

        let winds = vec![empty_wind; (width * height) as usize];
        let burns = vec![empty_wind; (width * height) as usize];

        let rng: SplitMix64 = SeedableRng::seed_from_u64(0x734f_6b89_de5f_83cc);
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

    /// Reset's the `Universe` to a empty state.
    ///
    /// Note that this does not affect the undo-stack (subject to change).
    pub fn reset(&mut self) {
        for i in 0..(self.width * self.height) as usize {
            self.cells[i] = EMPTY_CELL;
        }
    }

    /// Updates the `Universe`.
    ///
    /// Applies two operations to every cell:
    /// - Firstly, moves every cell according to the wind under it.
    /// - Secondly, calls each cell's update method. ([`Species::update`])
    pub fn tick(&mut self) {
        // let mut next = self.cells.clone();
        // let dx = self.winds[(self.width * self.height / 2) as usize].dx;
        // let js: JsValue = (dx).into();
        // console::log_2(&"dx: ".into(), &js);

        // blow each cell according to wind
        // TODO: we don't need the x/y coords for each cell/ wind. loop over the vec instead.
        for x in 0..self.width {
            for y in 0..self.height {
                let cell = self.get_cell(x, y);
                let wind = self.get_wind(x, y);
                Universe::blow_wind(
                    cell,
                    wind,
                    &mut UniverseContext {
                        universe: self,
                        x,
                        y,
                    },
                )
            }
        }
        self.generation = self.generation.wrapping_add(1);

        // move each cell according to update method
        for x in 0..self.width {
            // TODO: is this needed?
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
                    &mut UniverseContext {
                        universe: self,
                        x: scanx,
                        y,
                    },
                );
            }
        }

        self.generation = self.generation.wrapping_add(1);
    }

    /// Returns the width of the `Universe`.
    pub fn width(&self) -> i32 {
        self.width
    }

    /// Returns the height of the `Universe`.
    pub fn height(&self) -> i32 {
        self.height
    }

    /// Returns a raw pointer to the `Universe`'s cells.
    // TODO: change this method to `cells_ptr`
    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }

    /// Returns a raw pointer to the `Universe`'s winds
    // TODO: change this method to `winds_ptr`
    pub fn winds(&self) -> *const Wind {
        self.winds.as_ptr()
    }

    /// Returns a raw pointer to the `Universe`'s burns
    // TODO: change this method to `burns_ptr`
    pub fn burns(&self) -> *const Wind {
        self.burns.as_ptr()
    }

    /// Draw a circle of a certain `Species` into the `Universe`
    ///
    /// - `x` and `y` refer to the center of the circle.
    /// - `size` is the diameter of the circle.
    /// - `species` is the kind of cell you want to paint.
    ///
    /// Note that each painted cell has it's own `ra` generated semi-randomly. This causes a noise effect on the resulting circle.
    pub fn paint(&mut self, x: i32, y: i32, size: i32, species: Species) {
        let size = size;
        let radius: f64 = f64::from(size) / 2.0;

        let floor = (radius + 1.0) as i32;
        let ciel = (radius + 1.5) as i32;

        for dx in -floor..ciel {
            for dy in -floor..ciel {
                if f64::from((dx * dx) + (dy * dy)) > (radius * radius) {
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
                        species,
                        ra: 60
                            + (size as u8)
                            + (self.rng.gen::<f32>() * 30.) as u8
                            + ((self.generation % 127) as i8 - 60).unsigned_abs(),
                        rb: 0,
                        clock: self.generation,
                    }
                }
            }
        }
    }

    /// Save the current `Universe`'s cells to the undo stack
    ///
    /// Note that the undo stack's size is capped at 50.
    pub fn push_undo(&mut self) {
        self.undo_stack.push_front(self.cells.clone());
        self.undo_stack.truncate(50);
    }

    /// Pop a state from the undo stack and apply it
    ///
    /// Does nothing is the undo stack is empty.
    pub fn pop_undo(&mut self) {
        let old_state = self.undo_stack.pop_front();
        if let Some(state) = old_state {
            self.cells = state
        }
    }

    /// Clear the undo stack
    pub fn flush_undos(&mut self) {
        self.undo_stack.clear();
    }
}

/// Private helper methods
impl Universe {
    /// Converts a xy coord to an index into the `cells` vec
    fn get_index(&self, x: i32, y: i32) -> usize {
        (x * self.height + y) as usize
    }

    /// Returns the [`Copy`]ed cell at the given coords
    fn get_cell(&self, x: i32, y: i32) -> Cell {
        let i = self.get_index(x, y);
        self.cells[i]
    }

    /// Returns the [`Copy`]ed wind at the given coords
    fn get_wind(&self, x: i32, y: i32) -> Wind {
        let i = self.get_index(x, y);
        self.winds[i]
    }

    /// Moves a cell based on some wind
    ///
    /// Each cell has a threshold for movement, they are hardcoded here.
    /// Also does not update if the cell has already been moved, checked with `cell.clock`.
    fn blow_wind(cell: Cell, wind: Wind, ctx: &mut UniverseContext) {
        if cell.clock - ctx.universe.generation == 1 {
            return;
        }
        if cell.species == Species::Empty {
            return;
        }
        let mut dx = 0;
        let mut dy = 0;

        let threshold = match cell.species {
            Species::Empty | Species::Wall | Species::Cloner => i32::MAX,

            Species::Stone | Species::Wood => 70,

            Species::Plant | Species::Lava | Species::Ice => 60,

            Species::Fungus => 54,

            Species::Oil => 50,

            // Intentionally left out and covered by the default case
            // Species::Water => 40,
            // Species::Acid => 40,
            Species::Seed => 35,

            Species::Sand | Species::Mite | Species::Rocket => 30,

            Species::Dust => 10,
            Species::Fire | Species::Gas => 5,
            /*
             Some hacked species values exist outside of the enum values.
             Making sure the default case is emitted allows "BELP" to have a defined wind threshold.
             Originally, threshold was a hardcoded value, so this preserves that original glitch behavior.
             See: https://sandspiel.club/#eMlYGC52XIto0NM1WjaJ
            */
            _ => 40,
        };

        let wx = i32::from(wind.dy) - 126;
        let wy = i32::from(wind.dx) - 126;

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
        if (dx != 0 || dy != 0) && ctx.get(dx, dy).species == Species::Empty {
            ctx.set(0, 0, EMPTY_CELL);
            if dy == -1
                && ctx.get(dx, -2).species == Species::Empty
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
            ctx.set(dx, dy, cell);
        }
    }

    /// Updates a cell with the logic for each species
    ///
    /// Does not update if the cell has already been moved, checked with `cell.clock`.
    fn update_cell(cell: Cell, ctx: &mut UniverseContext) {
        if cell.clock - ctx.universe.generation == 1 {
            return;
        }

        cell.update(ctx);
    }

    /// Returns the `Universe`'s internal clock
    ///
    /// This is used for checking whether a cell has already been updated.
    pub fn generation(&self) -> u8 {
        self.generation
    }

    /// Returns the `Universe`'s P-RNG object
    pub fn rng_mut(&mut self) -> &mut SplitMix64 {
        &mut self.rng
    }

    /// [`Clone`]s and returns the `Universe`'s P-RNG object
    pub fn rng_cloned(&self) -> SplitMix64 {
        self.rng.clone()
    }
}

/// A context passed to cells when they are updated
///
/// This provides an API for cells to modify their neighbours and change the `Universe`.
/// The context is also passed the xy coord of the cell being updated, so that relative positions can be used in cell update logic.
pub struct UniverseContext<'a> {
    x: i32,
    y: i32,
    universe: &'a mut Universe,
}

/// Defines important public function for cell usage.
impl<'a> UniverseContext<'a> {
    /// [`Copy`] and return a cell at the *relative* xy coords
    ///
    /// Currently this implementation is arbitrarily limited to 2 units in each direction; the function panics if further offsets are used.
    /// If the resulting position is outside of the `Universe`'s bounds, then a `Species::Wall` is returned.
    pub fn get(&mut self, dx: i32, dy: i32) -> Cell {
        if !(-2..=2).contains(&dx) || !(-2..=2).contains(&dy) {
            panic!("tried to get cell outside of allowed bounds");
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

    /// Sets a cell at the *relative* xy coords
    ///
    /// Currently this implementation is arbitrarily limited to 2 units in each direction; the function panics if further offsets are used.
    /// If the resulting position is outside of the `Universe`'s bounds, then the function silently exits.
    /// Also note that cells set with this function will *not* be updated in the same tick again.
    pub fn set(&mut self, dx: i32, dy: i32, v: Cell) {
        if !(-2..=2).contains(&dx) || !(-2..=2).contains(&dy) {
            panic!("tried to set cell outside of allowed bounds");
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

    /// Gets the fluid ([`Wind`]) at the `UniverseContext`'s position
    pub fn get_fluid(&mut self) -> Wind {
        let idx = self.universe.get_index(self.x, self.y);

        self.universe.winds[idx]
    }

    /// Sets the fluid ([`Wind`]) at the `UniverseContext`'s position
    pub fn set_fluid(&mut self, v: Wind) {
        let idx = self.universe.get_index(self.x, self.y);

        self.universe.burns[idx] = v;
    }

    /// Returns a mutable reference to the `Universe`.
    ///
    /// This can be used to make further changes, outside of the `UniverseContext` capabilities.
    pub fn universe_mut(&mut self) -> &mut Universe {
        self.universe
    }

    /// Returns a shared (immutable) reference to the `Universe`.
    pub fn universe(&self) -> &Universe {
        self.universe
    }
}

/// P-RNG helper functions that internally use the `Universe`'s RNG instance
impl UniverseContext<'_> {
    /// Generates a random integer in the given range
    pub fn rand_int<R: SampleRange<i32>>(&mut self, range: R) -> i32 {
        self.universe_mut().rng_mut().gen_range(range)
    }

    /// Returns true on average every 1/n times
    ///
    /// In other words, checks whether a random integer in range `0..n` is zero.
    pub fn once_in(&mut self, n: i32) -> bool {
        self.rand_int(0..n) == 0
    }

    /// Returns a random 1d unit vector (i.e a single number)
    ///
    /// The `include_zero` flag expands the possible outputs to include `0`.
    pub fn rand_vec1(&mut self, include_zero: bool) -> i32 {
        if include_zero {
            self.rand_int(-1..=1)
        } else {
            match self.rand_int(0..=1) {
                0 => -1,
                1 => 1,
                _ => unreachable!(),
            }
        }
    }

    /// Returns a random 2d unit vector (i.e a xy direction)
    ///
    /// The `include_zero` flag expands the possible outputs to include `(0, 0)`.
    pub fn rand_vec2(&mut self, include_zero: bool) -> (i32, i32) {
        let i = self.rand_int(if include_zero { 0..=8 } else { 0..=7 });
        match i {
            0 => (1, 1),
            1 => (1, 0),
            2 => (1, -1),
            3 => (0, -1),
            4 => (-1, -1),
            5 => (-1, 0),
            6 => (-1, 1),
            7 => (0, 1),
            8 => (0, 0),
            _ => unreachable!(),
        }
    }
}
