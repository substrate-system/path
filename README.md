# path
![tests](https://github.com/substrate-system/path/actions/workflows/nodejs.yml/badge.svg)
[![types](https://img.shields.io/npm/types/@substrate-system/path?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![install size](https://flat.badgen.net/packagephobia/install/@substrate-system/path)](https://packagephobia.com/result?p=@substrate-system/path)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

The `path` module from Node.js for browsers

This implements the Node.js [`path`][path] module for environments that do not have it, like browsers.

<details><summary><h2>Contents</h2></summary>

<!-- toc -->

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [License](#license)

<!-- tocstop -->

</details>

## Install

```sh
npm i -S @substrate-system/path
```

## Usage

```javascript
import { path } from '@susbtrate-system/path'

const filename = 'logo.png';
const logo = path.join('./assets/img', filename);
document.querySelector('#logo').src = logo;
```

## API

See the [Node.js path docs][path]. `@substrate-system/path` currently matches the Node.js 10.3 API. `@substrate-system/path` only implements the POSIX functions, not the win32 ones.

## License

[MIT](./LICENSE)

[path]: https://nodejs.org/docs/v10.3.0/api/path.html
