
/**
 * Module dependencies.
 */

// commented out by npm-component: var Emitter = require('tower-emitter');
// commented out by npm-component: var validator = require('tower-validator');
var types = require('./lib/types');

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
 *
 * @param {String} name Type name.
 * @param {Function} fn A function added to a list of sanitizers that sanitizes the type.
 * @return {Type} A type instance.
 * @api public
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
 * @param {String} name Type name.
 * @return {Boolean} true if `Type` exists, else false.
 * @api public
 */

exports.defined = function(name){
  return exports.collection.hasOwnProperty(name);
};

/**
 * Scope validators to a namespace.
 *
 * @param {String} ns A namespace
 * @return {Function} A function that returns a namespaced exports object.
 * @api public
 */

exports.ns = function(ns){
  return function type(name, fn) {
    return exports(ns + '.' + name, fn);
  }
};

/**
 * Remove all validators.
 *
 * @chainable
 * @return {Function} exports The main `type` function.
 * @api public
 */

exports.clear = function(){
  var collection = exports.collection;

  exports.off();
  for (var key in collection) {
    if (collection.hasOwnProperty(key)) {
      delete collection[key];
    }
  }
  collection.length = 0;
  return exports;
};

/**
 * Class representing a type.
 *
 * @class
 * @param {String} name A type name.
 * @param {Function} fn A function added to a list of sanitizers that sanitizes the type.
 * @api public
 */

function Type(name, fn) {
  // XXX: name or path? maybe both.
  this.name = name;
  // XXX: or maybe just delegate:
  // this.validator = type.validator.ns(name);
  // that might reduce memory quite a bit.
  // even though it's still only a tiny bit of it.
  this.validators = [];
  // serialization/sanitization function.
  if (fn) this.use(fn);
}

/**
 * Add a validator function to a type.
 *
 * @chainable
 * @param {String} name A validator name.
 * @param {Function} fn A validator function.
 * @returns {Type}.
 * @api public
 */

Type.prototype.validator = function(name, fn){
  // XXX: see above, this should probably just
  // be happening in `validator.ns(this.name)`.
  exports.validator(this.name + '.' + name, fn);
  this.validators.push(this.validators[name] = fn);
  return this;
};

/**
 * Sanitize functions to pass value through.
 *
 * @chainable
 * @param {Function} fn A sanitizor function.
 * @return {Type}
 * @api public
 */

Type.prototype.use = function(fn){
  (this.sanitizers || (this.sanitizers = [])).push(fn);
  return this;
};

/**
 * Sanitize (or maybe `serialize`).
 *
 * XXX: maybe rename to `cast`?
 *
 * @param {Mixed} val A value to sanitize.
 * @return {Mixed} The value sanitized.
 * @api public
 */

Type.prototype.sanitize = function(val, obj){
  if (!this.sanitizers) return val;

  for (var i = 0, n = this.sanitizers.length; i < n; i++) {
    val = this.sanitizers[i](val, obj);
  }

  return val;
};

/**
 * Seralizer object by name.
 *
 * XXX: Maybe refactor into `tower/serializer` module.
 *
 * @chainable
 * @param {String} name Object name.
 * @return {Type}
 * @api public
 */

Type.prototype.serializer = function(name){
  this.context = (this.serializers || (this.serializers = {}))[name] = {};
  return this;
};

/**
 * Define how to serialize type from
 * JavaScript to external API/service request format.
 *
 * XXX: to/out/request/serialize/format/use
 *
 * @chainable
 * @param {Function} fn Function to handle serialization.
 * @return {Type}
 * @api public
 */

Type.prototype.to = function(fn){
  // XXX: some way to set a default serializer.
  if (!this.context) this.serializer('default');
  this.context.to = fn;
  return this;
};

/**
 * Define how to deserialize type from 
 * external API/service request format to JavaScript.
 *
 * XXX: from/in/response/deserialize
 *
 * @chainable
 * @param {Function} fn Function to handle deserialization.
 * @return {Type}
 * @api public
 */

Type.prototype.from = function(fn){
  if (!this.context) this.serializer('default');
  this.context.from = fn;
  return this;
};

/**
 * Bring back to parent context.
 *
 * XXX: need more robust way to do this across modules.
 *
 * @param {String} name A type name.
 */

Type.prototype.type = function(name){

};

types(exports);