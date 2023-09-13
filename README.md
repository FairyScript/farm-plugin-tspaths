# farm-plugin-tspaths

Support for TypeScript's path mapping in Farm

**This project is still under development, please do not use it in a production environment.**

## Installation

To install this package, run the following command:

```shell
npm install -D farm-plugin-tspaths
```

## Usage

To use this package, simply import it in your TypeScript files:

```typescript
//farm.config.ts
import { tsPathPlugin } from 'farm-plugin-tspaths'

export default defineConfig({
  plugins: [...otherPlugins, tsPathPlugin()],
})
```

This will enable path mapping in your Farm project.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue if you encounter any problems.

## License

This package is licensed under the MIT License. See the LICENSE file for details.
