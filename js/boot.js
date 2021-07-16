import { Species } from "../crate/pkg";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function boot(width, height) {
  //   for (let r = 0; r <= width * 1.7; r += 28) {
  //     for (let s = 6; s >= 1; s -= 1) {
  //       let rr = r - s * 4;
  //       window.u.paint(width / 2, height / 2, rr + 5, Species.Sand);
  //       window.u.paint(width / 2, height / 2, rr, Species.Empty);
  //       await sleep(16);
  //     }
  //   }

  //   for (let x = 5; x <= width - 5; x += Math.random() * 9) {
  //     window.u.paint(
  //       x,
  //       Math.floor(height - 40 + 20 * Math.sin(x / 50)),
  //       3,
  //       Species.Stone
  //     );
  //     await sleep(2);
  //   }
  for (let x = 5; x <= width - 5; x += 10) {
    window.u.paint(
      x,
      Math.floor(height - 40 + 5 * Math.sin(x / 20)),
      Math.random() * 6 + 10,
      Species.Sand
    );
    // window.u.paint(
    //   width - x,
    //   Math.floor(height - 40 + 5 * Math.sin(x / 20)),
    //   Math.random() * 6 + 10,
    //   Species.Sand
    // );
    if (window.stopboot) return;
    await sleep(16);
  }
  for (let x = 40; x <= width - 40; x += 50 + Math.random() * 10) {
    window.u.paint(
      x,
      Math.floor(height / 2 + 20 * Math.sin(x / 20)),
      6,
      Species.Seed
    );
    if (window.stopboot) return;

    await sleep(180);
  }

  //   for (let a = 0; a <= 180; a += 4) {
  //     let x = (width / 3 + 10) * Math.cos(a * (Math.PI / 180));
  //     let y = (height / 3 + 10) * Math.sin(a * (Math.PI / 180));
  //     window.u.paint(width / 2 + x, height / 2 + y, 21, Species.Sand);
  //     window.u.paint(width / 2 - x, height / 2 - y, 21, Species.Sand);
  //     await sleep(8);
  //   }
}
function drawBowl() {
  window.u.paint(h, h, d + 2, Species.Sand);
  window.u.paint(h, h, d - 2, Species.Empty);
}

export { sleep, boot };
