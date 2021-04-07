const AST = require('./AST')

class VarDecl extends AST {

  constructor(varNode, typeNode) {
    super()
    this.varNode = varNode
    this.typeNode = typeNode
  }

  accept() {}
   
}

module.exports = VarDecl