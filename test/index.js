var type = require('..')
  , validator = type.validator
  , assert = require('assert');

describe('type', function(){
  it('should define validators for type', function(){
    var birthdate = Date.parse('1950-12-21')
      , now = Date.parse('2013-05-01')
      , calls = [];

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
      .use(stripLetters);

    assert('123' === type('digits').sanitize('  1  foo b2a3r'));

    function stripWhitespace(val) {
      return val.replace(/\s+/g, '');
    }

    function stripLetters(val) {
      return val.replace(/[a-z]+/g, '');
    }
  });
});