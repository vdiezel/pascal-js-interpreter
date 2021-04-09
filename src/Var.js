const AST = require('./AST')
const { getVar, isStored } = require('./ADT')
const SymbolTableBuilder = require('./SymbolTableBuilder')

class Var extends AST {

  constructor(token) {
    super()
    this.token = token
  }

  get value() {
    return this.token.value
  }

  accept(visitor) {
    const varName = this.value

    if (visitor instanceof SymbolTableBuilder) {
      const hasSymbol = visitor.scope.has(varName)
      if (!hasSymbol) {
        throw new Error(`${varName} is not defined`)
      }
      return
    }

    if (!isStored(varName)) {
      throw new Error(`No variable ${varName} defined`)
    }

    return getVar(varName)
  }
   
}

module.exports = Var