let samples = 600;

window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}

const fps = new (class {
  constructor() {
    this.fps = document.getElementById("fps");
    this.frames = [];
    this.lastFrameTimeStamp = performance.now();
  }

  render() {
    // Convert the delta time since the last frame render into a measure
    // of frames per second.
    const now = performance.now();
    const delta = now - this.lastFrameTimeStamp;
    this.lastFrameTimeStamp = now;
    const fps = (1 / delta) * 1000;

    // Save only the latest 100 timings.
    this.frames.push(fps);
    if (this.frames.length > 30) {
      this.frames.shift();
    }

    // Find the max, min, and mean of our 100 latest timings.
    let sum: i32 = this.frames.iter().sum();
    //let min = this.frames.iter().min().unwrap_or(0);
    //let max = this.frames.iter().max().unwrap_or(0);

    let mean = sum / this.frames.length;
    samples--;
    if (samples === 0) {
      console.log(`sending fps ${Math.round(mean)} to ga`);
      gtag("event", "fps", {
        value: Math.round(mean),
      });
      if (mean < 50) {
        gtag("event", "fps-L50", {
          value: Math.round(mean),
        });
      }

      if (mean < 40) {
        gtag("event", "fps-L40", {
          value: Math.round(mean),
        });
      }
      if (mean < 30) {
        gtag("event", "fps-L30", {
          value: Math.round(mean),
        });
      }
      if (mean < 20) {
        gtag("event", "fps-L20", {
          value: Math.round(mean),
        });
      }
    }
    // Render the statistics.
    this.fps.textContent = `FPS:${Math.round(mean)}`;
  }
})();

export { fps };
