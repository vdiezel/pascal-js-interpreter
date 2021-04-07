const AST = require('./AST')
const SymbolTableBuilder = require('./SymbolTableBuilder')

class Num extends AST {

  constructor(token) {
    super()
    this.token = token
  }

  get value() {
    return this.token.value
  }

  accept(visitor) {
    if (visitor instanceof SymbolTableBuilder) return
    return this.value
  }
   
}

module.exports = Num