
/**
 * Module dependencies.
 */

var Emitter = require('tower-emitter')
  , validator = require('tower-validator')
  , types = require('./lib/types');

/**
 * Expose `type`.
 */

exports = module.exports = type;

/**
 * Expose `Type`.
 */

exports.Type = Type;

/**
 * Expose `collection`.
 */

exports.collection = [];

/**
 * Expose `validator`.
 */

exports.validator = validator.ns('type');

/**
 * Define or get a type.
 */

function type(name, fn) {
  if (undefined === fn && exports.collection[name])
      return exports.collection[name];

  var instance = new Type(name, fn);
  exports.collection[name] = instance;
  exports.collection.push(instance);
  exports.emit('define', name, instance);
  return instance;
}

/**
 * Mixin `Emitter`.
 */

Emitter(exports);

/**
 * Check if validator exists.
 *
 * @param {String} name
 */

exports.has = function(name){
  return !!exports.collection[name];
}

/**
 * Scope validators to a namespace.
 */

exports.ns = function(ns){
  return function type(name, fn) {
    return exports(ns + '.' + name, fn);
  }
}

/**
 * Remove all validators.
 */

exports.clear = function(){
  exports.off();
  // XXX: instead of creating a new array,
  // it should just set length to zero (and clear keys).
  exports.collection = [];
  return exports;
}

function Type(name, fn) {
  // XXX: name or path? maybe both.
  this.name = name;
  // serialization/sanitization function.
  if (fn) this.serializer = fn;
  // XXX: or maybe just delegate:
  // this.validator = type.validator.ns(name);
  // that might reduce memory quite a bit.
  // even though it's still only a tiny bit of it.
  this.validators = [];
}

Type.prototype.validator = function(name, fn){
  // XXX: see above, this should probably just
  // be happening in `validator.ns(this.name)`.
  exports.validator(this.name + '.' + name, fn);
  this.validators.push(this.validators[name] = fn);
  return this;
}

types(exports);