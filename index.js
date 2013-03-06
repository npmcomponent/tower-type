exports['string.eq'] = function(a, b){
  return 'string' == typeof a && a === b;
}

exports['string.gte'] = function(a, b){
  return 'string' == typeof a && 'string' == typeof b && a.length >= b.length;
}

exports['number.eq'] = function(a, b){
  return 'number' == typeof a && a === b;
}

exports['number.gte'] = function(a, b){
  return 'number' == typeof a && a >= b;
}
