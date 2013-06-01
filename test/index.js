
if ('undefined' === typeof window) {
  var type = require('..');
  var assert = require('assert');
} else {
  var type = require('tower-type');
  var assert = require('timoxley-assert');
}

var validator = type.validator;

describe('type', function(){
  it('should define validators for type', function(){
    var birthdate = Date.parse('1950-12-21');
    var now = Date.parse('2013-05-01');
    var calls = [];

    type('birthdate')
      .validator('can-drive', function(val){
        calls.push('birthdate.can-drive');
        return now >= val;
      });

    var validate = validator('birthdate.can-drive');
    assert(true === validate(birthdate));
    assert(1 === calls.length);
    assert('birthdate.can-drive' === calls[0]);
  });

  it('should have default validators for native types', function(){
    assert(2 === type('string').validators.length);
  });

  it('should sanitize value', function(){
    type('digits')
      .use(stripWhitespace)
      .use(stripLetters)
      .use(parseInt);

    assert(123 === type('digits').sanitize('  1  foo b2a3r'));

    function stripWhitespace(val) {
      return val.replace(/\s+/g, '');
    }

    function stripLetters(val) {
      return val.replace(/[a-z]+/g, '');
    }
  });

  it('should typecast array', function(){
    assert.deepEqual([ 'a', 'b' ], type('array').sanitize('a,b'));
    assert.deepEqual([ 'a', 'b' ], type('array').sanitize('a, b'));
    assert.deepEqual([ 'a b' ], type('array').sanitize('a b'));
    assert.deepEqual([ 'a', 'b' ], type('array').sanitize([ 'a', 'b' ]));
  });

  it('should define serializers', function(){
    type('ec2.array')
      .serializer('basic')
        // XXX: maybe need all these params
        //      b/c some params may be expanded into
        //      several.
        //      Also, the arguments are customizable,
        //      since for now at least you manually iterate
        //      through serializers and pass arguments.
        .to(function(self, params, name, val){
          return 'to value';
        })
        .from(function(self, val){
          return 'from value';
        });

    var serializer = type('ec2.array').serializers['basic'];
    assert('to value' === serializer.to());
    assert('from value' === serializer.from());
  });

  describe('clear function', function(){
    it('should turn off define event listener', function(){
      type.on('define', function(){});
      assert(true === type.hasListeners('define'));
      type.clear();
      assert(false === type.hasListeners('define'));
    });

    it('should clear collection object', function(){
      type('random');
      assert(0 < type.collection.length);
      type.clear();
      assert(0 === type.collection.length);
      assert(false === !!type.collection['random']);
    });
  });
});