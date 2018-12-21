#[macro_use]
extern crate criterion;
extern crate sandtable;

use sandtable::Species;

use criterion::Criterion;

fn criterion_benchmark(c: &mut Criterion) {
    c.bench_function("simple iter 100x100", |b| {
        let mut u = sandtable::Universe::new(100, 100);

        u.paint(10, 12, 5, Species::Oil);
        u.paint(10, 10, 5, Species::Lava);
        u.paint(10, 20, 5, Species::Seed);

        b.iter(|| u.tick());
    });
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
