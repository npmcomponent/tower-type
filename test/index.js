var operator = require('..')
  , operators = operator.collection
  , assert = require('assert');

describe('operators', function(){
  it('should test eq', function(){
    var eq = operator('eq');

    assert(true === eq('foo', 'foo'));
    assert(false === eq('foo', 'bar'));
    assert(true === eq(null, null));
  });

  it('should test gte', function(){
    var gte = operator('gte');

    assert(true === gte(10, 5));
    assert(false === gte(10, 20));
    assert(true === gte(10, 10));
  });

  describe('string', function(){
    it('should test eq', function(){
      assert(true === operators['string.eq']('foo', 'foo'));
      assert(false === operators['string.eq']('foo', 'bar'));
      assert(false === operators['string.eq'](null, null));
    });

    it('should test gte', function(){
      assert(false === operators['string.gte']('foo', 'hello world'));
      assert(true === operators['string.gte']('foo', 'foo'));
      assert(true === operators['string.gte']('foo', 'bar'));
      assert(true === operators['string.gte']('foo', 'a'));
    });
  });
});