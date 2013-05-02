# Tower Type

## Installation

node.js:

```bash
$ npm install tower-type
```

browser:

```bash
$ component install tower/type
```

## Example

Define a custom type and validators/comparators.

```js
var type = require('tower-type');

type('string')
  .validator('gte', function gte(a, b){
    return a.length >= b.length;
  })
  .validator('gt', function gt(a, b){
    return a.length > b.length;
  });

var now = Date.parse('2013-05-01');

type('birthdate')
  .validator('can-drive', function(val){
    return Date.parse('1950-12-21') >= val;
  });
```

## License

MIT