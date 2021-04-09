const AST = require('./AST')
const { SemanticError, ERROR_CODES } = require('./Error')
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
      const token = this.varNode.token
      const errorCode = ERROR_CODES.DUPLICATE_ID
      throw new SemanticError({
         message: `${errorCode} -> "${token.value}" line ${token.lineno} colum ${token.column}`,
         token,
         errorCode,
      })
    }
    
    visitor.scope.define(varSymbol)
  }
   
}

module.exports = VarDecl