const Symbol = require('./Symbol');

class VarSymbol extends Symbol {

  constructor(name, type) {
    super(name, type)
  }

}

module.exports = VarSymbol