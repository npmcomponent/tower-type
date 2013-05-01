
/**
 * Module dependencies.
 */

var indexof = require('indexof');

/**
 * Expose `operator`.
 */

exports = module.exports = operator;

/**
 * Expose `collection`.
 */

var collection = exports.collection = {};

/**
 * Define or get an operator.
 *
 * XXX: Maybe these should each be broken down into
 *      uber-tiny `part/gte` modules.
 */

function operator(key, fn) {
  return 1 === arguments.length
    ? collection[key]
    : collection[key] = fn;
}

collection.eq = function eq(a, b){
  return a === b;
}

collection.neq = function neq(a, b){
  return a !== b;
}

collection['in'] = function _in(a, b){
  return indexof(a, b);
}

collection.nin = function nin(a, b){
  return !indexof(a, b);
}

collection.gte = function gte(a, b){
  return a >= b;
}

collection.gt = function gt(a, b){
  return a > b;
}

collection.lte = function gte(a, b){
  return a <= b;
}

collection.lt = function gt(a, b){
  return a < b;
}

collection.match = function match(a, b){
  return !!a.match(b);
}

// XXX: may move these out.
collection['string.eq'] = function(a, b){
  return 'string' === typeof a && a === b;
}

collection['string.gte'] = function(a, b){
  return 'string' === typeof a && 'string'=== typeof b && a.length >= b.length;
}

collection['number.eq'] = function(a, b){
  return 'number' === typeof a && a === b;
}

collection['number.gte'] = function(a, b){
  return 'number' === typeof a && a >= b;
}