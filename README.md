<meta charset="utf-8"/>

# sandspiel

"Imagine the cool phenomenon when the wind blows the falling leaves. This game simulates the phenomenon with powder (dots)!" -DAN-BALL

![](Screenshot.png)

This is a [falling sand](https://en.wikipedia.org/wiki/Falling-sand_game) game built in rust (via wasm), webgl, and some JS glueing things together.

You can [play online](https://sandspiel.club) or read [a longer post on the project](https://maxbittker.com/making-sandspiel)

The goal was to produce an cellular automata environment that's interesting to play with and supports the sharing and forking of fun creations with other players.
Ultimately, I want the platform to support editing and uploading of your own elements via a programmable cellular automata API.

### 🛠️ Build:

```
# build the wasm once:
cd crate && wasm-pack build && cd ..;
npm install;
npm run start;

# then in a separate terminal:
cargo watch -s 'wasm-pack build'
```

a successor to my previous efforts in [javascript](https://github.com/MaxBittker/dust) and [lua](https://github.com/MaxBittker/sand-toy)

Fluid simulation code adopted from
https://github.com/PavelDoGreat/WebGL-Fluid-Simulation
