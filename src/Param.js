const AST = require('./AST')

class Param extends AST {

  constructor(varNode, typeNode) {
    super()
    this.varNode = varNode
    this.typeNode = typeNode
  }

  accept(visitor) {

  }
   
}

module.exports = Param