
/**
 * Module dependencies.
 */

var isArray = require('part-is-array');

/**
 * Expose `types`.
 */

module.exports = types;

/**
 * Define basic types and type validators.
 */

function types(type) {
  // XXX: type('string').validator('lte')
  // would default to `validator('gte')` if not explicitly defined.
  type('string')
    .use(String)
    .validator('gte', function gte(a, b){
      return a.length >= b.length;
    })
    .validator('gt', function gt(a, b){
      return a.length > b.length;
    });

  type('id');

  type('integer')
    .use(parseInt);

  type('float')
    .use(parseFloat);

  type('decimal')
    .use(parseFloat);

  type('number')
    .use(parseFloat);
    
  type('date')
    .use(parseDate);

  type('boolean')
    .use(parseBoolean);

  type('array')
    // XXX: test? test('asdf') // true/false if is type.
    // or `validate`
    .use(function(val){
      // XXX: handle more cases.
      return isArray(val)
        ? val
        : val.split(/,\s*/);
    })
    .validator('lte', function lte(a, b){
      return a.length <= b.length;
    });

  function parseDate(val) {
    return isDate(val)
      ? val
      : new Date(val);
  }

  function parseBoolean(val) {
    // XXX: can be made more robust
    return !!val;
  }
}

// XXX: refactor to `part`
function isDate(val) {
  return '[object Date]' === Object.prototype.toString.call(val);
}