const AST = require('./AST')
const TokenTypes = require('./TokenTypes')
const SymbolTableBuilder = require('./SymbolTableBuilder')

class UnaryOp extends AST {

  constructor(op, expr) {
    super()
    this.token = this.op = op
    this.expr = expr
  }
   
  accept(visitor) {
    if (visitor instanceof SymbolTableBuilder) {
      return
    }

    switch(this.op.type) {
      case(TokenTypes.PLUS_OP):
        return visitor.visit(this.expr)
      case(TokenTypes.MINUS_OP):
        return -visitor.visit(this.expr)
    }
  }

}

module.exports = UnaryOp