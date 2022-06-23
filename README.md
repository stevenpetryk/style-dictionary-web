# Style Dictionary Web

A really simple example of running Style Dictionary live, in the browser, using Parcel.

The main strategy for getting it to run is the following:

- Alias all Node-specific packages to browser-friendly polyfills
- Patch Style Dictionary to avoid JSON5 (using `patch-package`)

This felt a lot easier than the [approach](https://backlight.dev/blog/nodejs-in-browser) recommended by the creators of Style-Dictionary-Play, mostly because it doesn't require a fork of Style Dictionary.

The Style Dictionary itself is really simple—just a single token.

## Scripts

- `yarn start-node` builds the Style Dictionary from Node (the normal way).
- `yarn start-web` starts a live-reloading webapp that runs Style Dictionary on the frontend.
