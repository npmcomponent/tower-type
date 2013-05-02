
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
    .validator('gte', function gte(a, b){
      return a.length >= b.length;
    })
    .validator('gt', function gt(a, b){
      return a.length > b.length;
    });

  type('number');
  type('date');
  type('boolean');
}