const AST = require('./AST')
const TokenTypes = require('./TokenTypes')

class UnaryOp extends AST {

  constructor(op, expr) {
    super()
    this.token = this.op = op
    this.expr = expr
  }
   
  accept(visitor) {
    switch(this.op.type) {
      case(TokenTypes.PLUS_OP):
        return visitor.visit(this.expr)
      case(TokenTypes.MINUS_OP):
        return -visitor.visit(this.expr)
    }
  }

}

module.exports = UnaryOp