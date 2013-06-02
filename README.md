# Tower Type

API for defining/sanitizing custom resource attribute types.

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

Define comparators/validators for basic types:

```js
var type = require('tower-type');

type('string')
  .validator('gte', function gte(a, b){
    return a.length >= b.length;
  })
  .validator('gt', function gt(a, b){
    return a.length > b.length;
  });
```

Define a custom type with custom validators:

```js
var now = Date.parse('2013-05-01');

type('birthdate')
  .validator('can-drive', function(val){
    return now >= val;
  });

var validate = type.validator('birthdate.can-drive');
validate(Date.parse('1950-12-21')); // true
```

Sanitize values:

```js
type('digits')
  .use(stripWhitespace)
  .use(stripLetters);

type('digits').sanitize('  1  foo b2a3r'); // 123

function stripWhitespace(val) {
  return val.replace(/\s+/g, '');
}

function stripLetters(val) {
  return val.replace(/[a-z]+/g, '');
}
```

## Testing

Install testem:

```bash
$ npm install -g testem
```

Run tests:

```bash
$ testem
```

Then, open all the browsers you want to test by going to the outputted url defaulted to [http://localhost:7357](http://localhost:7357)

Tests will run on any open browser linked to the stated url and your current Node environment.

## Contributing

Before you send a pull request, make sure your code meets the style guidelines at [https://github.com/tower/style-guide](https://github.com/tower/style-guide) and all tests pass.

## License

MIT