# Tower Operator

## Installation

node.js:

```bash
$ npm install tower-operator
```

browser:

```bash
$ component install tower/operator
```

## Example

Use an operator.

```js
var operator = require('tower-operator');

var gte = operator('gte');

assert(true === gte(10, 5)); // 10 >= 5
```

## License

MIT