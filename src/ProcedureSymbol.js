 const Symbol = require('./Symbol');

class ProcedureSymbol extends Symbol {

  constructor(name, params) {
    super(name)
    this.params = params || []
    this.blockAST = null
  }

}

module.exports = ProcedureSymbol