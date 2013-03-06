var operators = require('..')
  , assert = require('chai').assert;

describe('operators', function(){
  describe('string', function(){
    it('should test eq', function(){
      assert.isTrue(operators['string.eq']('foo', 'foo'));
      assert.isFalse(operators['string.eq']('foo', 'bar'));
      assert.isFalse(operators['string.eq'](null, null));
    })

    it('should test gte', function(){
      assert.isFalse(operators['string.gte']('foo', 'hello world'));
      assert.isTrue(operators['string.gte']('foo', 'foo'));
      assert.isTrue(operators['string.gte']('foo', 'bar'));
      assert.isTrue(operators['string.gte']('foo', 'a'));
    })
  })
})
