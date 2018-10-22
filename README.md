<meta charset="utf-8"/>

# SandTable
A falling sand game built with rust + webgl


* Want to use the published NPM package in a Website? [Check out
  `create-wasm-app`.](https://github.com/rustwasm/create-wasm-app)
* Want to make a monorepo-style Website without publishing to NPM? Check out
  [`rust-webpack-template`](https://github.com/rustwasm/rust-webpack-template)
  and/or
  [`rust-parcel-template`](https://github.com/rustwasm/rust-parcel-template).

## 🔋 Batteries Included

* [`wasm-bindgen`](https://github.com/rustwasm/wasm-bindgen) for communicating
  between WebAssembly and JavaScript.
* [`console_error_panic_hook`](https://github.com/rustwasm/console_error_panic_hook)
  for logging panic messages to the developer console.
* [`wee_alloc`](https://github.com/rustwasm/wee_alloc), an allocator optimized
  for small code size.


### 🛠️ Build with `wasm-pack build`

```
wasm-pack build
```

### 🔬 Test in Headless Browsers with `wasm-pack test`

```
wasm-pack test --headless --firefox
```
