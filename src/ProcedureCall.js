const ActivationRecord = require('./ActivationRecord')
const AST = require('./AST')
const { ParserError, ERROR_CODES } = require('./Error')
const SymbolTableBuilder = require('./SymbolTableBuilder')

class ProcedureCall extends AST {

  constructor(procName, args, token) {
    super()
    this.procName = procName
    this.args = args
    this.token = token
    this.procSymbol = null
  }

  accept(visitor) {

    if (visitor instanceof SymbolTableBuilder) {
      const procSymbol = visitor.scope.lookup(this.procName)
      this.procSymbol = procSymbol
      if (procSymbol.params.length !== this.args.length) {
        const errorCode = ERROR_CODES.WRONG_ARGUMENT_NUMBER
        const message = `${errorCode} in function call ${this.procName} in line ${this.token.lineno} column ${this.token.column}`
        throw new ParserError({ message, errorCode, token: this.token })
      }

      for (const arg of this.args) {
        visitor.visit(arg)
      }

      return
    } 

    const ar = new ActivationRecord(this.procName, 'PROCEDURE', this.procSymbol.scopeLevel + 1)
    const params = this.procSymbol.params

    params.forEach((paramSymbol, idx) => {
      ar.set(paramSymbol.name, visitor.visit(this.args[idx]))
    })

    visitor.callStack.push(ar)
    console.log(ar)
    visitor.visit(this.procSymbol.blockAST)
    console.log(ar)
    visitor.callStack.pop()
  }
   
}

module.exports = ProcedureCall