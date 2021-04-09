const AST = require('./AST')
const { ParserError, ERROR_CODES } = require('./Error')
const SymbolTableBuilder = require('./SymbolTableBuilder')

class ProcedureCall extends AST {

  constructor(procName, args, token) {
    super()
    this.procName = procName
    this.args = args
    this.token = token
  }

  accept(visitor) {
    if (visitor instanceof SymbolTableBuilder) {

      const procSymbol = visitor.scope.lookup(this.procName)

      if (procSymbol.params.length !== this.args.length) {
        const errorCode = ERROR_CODES.WRONG_ARGUMENT_NUMBER
        const message = `${errorCode} in function call ${this.procName} in line ${this.token.lineno} column ${this.token.column}`
        throw new ParserError({ message, errorCode, token: this.token })
      }

      for (const arg of this.args) {
        visitor.visit(arg)
      }
    }
  }
   
}

module.exports = ProcedureCall