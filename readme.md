# @esm2cjs/p-cancelable

This is a fork of https://github.com/sindresorhus/p-cancelable, but automatically patched to support ESM **and** CommonJS, unlike the original repository.

## Install

You can use an npm alias to install this package under the original name:

```
npm i p-cancelable@npm:@esm2cjs/p-cancelable
```

```jsonc
// package.json
"dependencies": {
    "p-cancelable": "npm:@esm2cjs/p-cancelable"
}
```

but `npm` might dedupe this incorrectly when other packages depend on the replaced package. If you can, prefer using the scoped package directly:

```
npm i @esm2cjs/p-cancelable
```

```jsonc
// package.json
"dependencies": {
    "@esm2cjs/p-cancelable": "^ver.si.on"
}
```

## Usage

```js
// Using ESM import syntax
import PCancelable from "@esm2cjs/p-cancelable";

// Using CommonJS require()
const PCancelable = require("@esm2cjs/p-cancelable").default;
```

> **Note:**
> Because the original module uses `export default`, you need to append `.default` to the `require()` call.

For more details, please see the original [repository](https://github.com/sindresorhus/p-cancelable).

## Sponsoring

To support my efforts in maintaining the ESM/CommonJS hybrid, please sponsor [here](https://github.com/sponsors/AlCalzone).

To support the original author of the module, please sponsor [here](https://github.com/sindresorhus/p-cancelable).
