const Symbol = require('./Symbol');

class BuiltInTypeSymbol extends Symbol {

  constructor(name) {
    super(name)
  }

}

module.exports = BuiltInTypeSymbol