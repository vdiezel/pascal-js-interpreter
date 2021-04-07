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
    const typeSymbol = visitor.symtab.lookup(typeName)
    const varName = this.varNode.value
    const varSymbol = new VarSymbol(varName, typeSymbol)
    visitor.symtab.define(varSymbol)
  }
   
}

module.exports = VarDecl