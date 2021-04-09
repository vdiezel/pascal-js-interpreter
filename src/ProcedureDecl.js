const AST = require('./AST')
const SymbolTableBuilder = require('./SymbolTableBuilder')
const ScopedSymbolTable = require('./ScopedSymbolTable')
const ProcedureSymbol = require('./ProcedureSymbol')
const VarSymbol = require('./VarSymbol')

class ProcedureDecl extends AST {

  constructor(procName, params, blockNode) {
    super()
    this.procName = procName
    this.params = params
    this.blockNode = blockNode
  }

  accept(visitor) {
    if (visitor instanceof SymbolTableBuilder) { 
      const procSymbol = new ProcedureSymbol(this.procName)
      visitor.scope.define(procSymbol)

      const procScope = new ScopedSymbolTable(this.procName, visitor.scope.scopeLevel + 1, visitor.scope)
      visitor.scope = procScope

      for (const param of this.params) {
        const paramType = visitor.scope.lookup(param.typeNode.value)
        const paramName = param.varNode.value
        const varSymbol = new VarSymbol(paramName, paramType)
        visitor.scope.define(varSymbol)
        procSymbol.params.push(varSymbol)
      }

      visitor.visit(this.blockNode)
      visitor.scope = visitor.scope.enclosingScope
    } else {
      //
    }
  }
   
}

module.exports = ProcedureDecl