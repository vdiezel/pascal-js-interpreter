const AST = require('./AST')
const TokenTypes = require('./TokenTypes')

class BinOp extends AST {

  constructor(left, op, right) {
    super()
    this.left = left
    this.op = op
    this.right = right
  }
   
  accept(visitor) {
    switch(this.op.type) {
      case(TokenTypes.PLUS_OP):
        return visitor.visit(this.left) + visitor.visit(this.right)
      case(TokenTypes.MINUS_OP):
        return visitor.visit(this.left) - visitor.visit(this.right)
      case(TokenTypes.MULTIPLY_OP):
        return visitor.visit(this.left) * visitor.visit(this.right)
      case(TokenTypes.DIVIDE_OP): // no support for floats yet
        return Math.round(visitor.visit(this.left) / visitor.visit(this.right))
    }
  }

}

module.exports = BinOp