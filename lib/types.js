
/**
 * Expose `types`.
 */

module.exports = types;

/**
 * Define basic types and type validators.
 */

function types(type) {
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