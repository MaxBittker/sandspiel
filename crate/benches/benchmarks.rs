use std::time::Duration;

use criterion::{criterion_group, criterion_main, Criterion};
use sandtable::{species::Species, universe::Universe};

fn setup_universe() -> Universe {
    let n = 300;
    let h = n / 2;
    let d = n / 10 * 9;

    let mut universe = Universe::new(n, n);

    universe.paint(10, 10, 10, Species::Sand);
    universe.paint(h, h, d + 2, Species::Plant);
    universe.paint(30, n - 10, 15, Species::Fire);
    universe.paint(h - 30, n - 10, 15, Species::Fire);
    universe.paint(h, h, n / 3, Species::Empty);
    universe.paint(h, h, n / 3, Species::Fire);

    universe
}

fn universe_benchmark(c: &mut Criterion) {
    let mut group = c.benchmark_group("Universe");
    group.measurement_time(Duration::from_secs(10));

    group.bench_function("universe::tick", |b| {
        let mut universe = setup_universe();
        b.iter(|| universe.tick())
    });
}

criterion_group!(benches, universe_benchmark);
criterion_main!(benches);
