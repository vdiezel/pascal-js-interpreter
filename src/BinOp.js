const AST = require('./AST')
const TokenTypes = require('./TokenTypes')
const SymbolTableBuilder = require('./SymbolTableBuilder')

class BinOp extends AST {

  constructor(left, op, right) {
    super()
    this.left = left
    this.op = op
    this.right = right
  }
   
  accept(visitor) {
    if (visitor instanceof SymbolTableBuilder) {
      visitor.visit(this.left)
      visitor.visit(this.right)
      return
    }

    switch(this.op.type) {
      case(TokenTypes.PLUS_OP):
        return visitor.visit(this.left) + visitor.visit(this.right)
      case(TokenTypes.MINUS_OP):
        return visitor.visit(this.left) - visitor.visit(this.right)
      case(TokenTypes.MULTIPLY_OP):
        return visitor.visit(this.left) * visitor.visit(this.right)
      case(TokenTypes.DIVIDE_OP):
        return visitor.visit(this.left) / visitor.visit(this.right)
      case(TokenTypes.INT_DIVIDE_OP): 
        return Math.floor(visitor.visit(this.left) / visitor.visit(this.right))
    }
  }

}

module.exports = BinOp