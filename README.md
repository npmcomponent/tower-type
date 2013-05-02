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

## License

MIT