
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
      
    });

  type('number');
  type('date');
  type('boolean');
}