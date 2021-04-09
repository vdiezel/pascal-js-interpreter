const AST = require('./AST')
const SymbolTableBuilder = require('./SymbolTableBuilder')
const VarSymbol = require('./VarSymbol')

class VarDecl extends AST {

  constructor(varNode, typeNode) {
    super()
    this.varNode = varNode
    this.typeNode = typeNode
  }

  accept(visitor) {
    if (!(visitor instanceof SymbolTableBuilder)) return 

    const typeName = this.typeNode.value
    const typeSymbol = visitor.scope.lookup(typeName)
    const varName = this.varNode.value
    const varSymbol = new VarSymbol(varName, typeSymbol)

    if (visitor.scope.has(varName, true)) {
      throw new Error(`${varName} is already defined in this scope ${visitor.scope.scopeName}`)
    }
    
    visitor.scope.define(varSymbol)
  }
   
}

module.exports = VarDecl