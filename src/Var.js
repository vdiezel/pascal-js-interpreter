const AST = require('./AST')
const { getVar } = require('./ADT')
const { SemanticError, ERROR_CODES } = require('./Error')
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
        const token = this.token
        const errorCode = ERROR_CODES.ID_NOT_FOUND
        throw new SemanticError({
          message: `${errorCode} -> "${token.value}" line ${token.lineno} colum ${token.column}`,
          token,
          errorCode,
        })
      }
      return
    }

    return getVar(varName)
  }
   
}

module.exports = Var