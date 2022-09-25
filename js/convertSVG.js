import { Species } from "../crate/pkg/sandtable";

export function rgbaToSpecies(r, g, b, a) {
  // Transparent to Empty
  if (a < 250) {
    return 0;
  }

  r /= 255;
  g /= 255;
  b /= 255;

  // https://github.com/Qix-/color-convert/blob/master/conversions.js#L58
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h;
  let s;

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h * 60, 360);

  if (h < 0) {
    h += 360;
  }

  const l = (min + max) / 2;

  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }

  // Greyscale options
  if (s < 0.05) {
    // Black to Wall
    if (l < 0.05) {
      return Species.Wall;
    }
    // White to Empty
    if (l > 0.95) {
      return Species.Empty;
    }
    // Light grey to Sand
    if (l > 0.5) {
      return Species.Sand;
    }
  }

  // Color options
  let hueIndex = Math.floor((h+30) / 360 * 7);
  let lightnessIndex = Math.floor(l * 4 - 0.25);

  const colorsToSpecies = [
    [ Species.Fire, Species.Lava, Species.Rocket], // Red
    [ Species.Wood, null, Species.Gas], // Yellow
    [ Species.Plant, Species.Dust, Species.Acid], // Green
    [ Species.Plant, Species.Dust, Species.Acid ], // Green2: duplicate b/c they are perceptually close
    [ Species.Water, Species.Ice, Species.Stone ], // Blue
    [ Species.Oil, Species.Seed, Species.Fungus], // Purple
    [ Species.Cloner, Species.Mite, null ], // Violet
  ];

  const species = colorsToSpecies?.[hueIndex]?.[lightnessIndex];

  return species ? species : Species.Empty;
}

export async function svgToImageData (svgString) {
  const width = 300;
  const height = 300;

  return new Promise((resolve, reject) => {
    // To fit any SVG, we would need to parse the SVG string and set the width
    // and height attributes to 300. It seems safer to not parse the SVG, and
    // just load it in an image element.
    const blob = new Blob([svgString], {type: 'image/svg+xml'});
    const img = document.createElement("img");
    img.width = width;
    img.height = height;
  
    img.addEventListener("load", () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      
      // Transform context to match Sandspiel Universe
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((-90 * Math.PI) / 180);
      ctx.scale(-1, 1.0);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
  
      ctx.drawImage(img, 0, 0);
  
      const imgData = ctx.getImageData(0, 0, width, height);
      resolve(imgData);
    });

    img.addEventListener('error', function (error) {
      reject(error);
    })

    img.src = URL.createObjectURL(blob);
  });
}