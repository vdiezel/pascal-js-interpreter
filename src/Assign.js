const AST = require('./AST')
const { setVar } = require('./ADT')
const SymbolTableBuilder = require('./SymbolTableBuilder')

class Assign extends AST {

  constructor(left, op, right) {
    super()
    this.left = left
    this.token = this.op = op
    this.right = right
  }
   
  accept(visitor) {
    if (visitor instanceof SymbolTableBuilder) {
      const varName = this.left.value
      const hasSymbol = visitor.scope.has(varName)
      if (!hasSymbol) {
        throw new Error(`${varName} is not defined`)
      }

      visitor.visit(this.right)
      return
    }

    setVar(this.left.value, visitor.visit(this.right))
  }

}

module.exports = Assign