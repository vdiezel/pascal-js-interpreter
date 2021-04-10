const AST = require('./AST')
const SymbolTableBuilder = require('./SymbolTableBuilder')

class Assign extends AST {

  constructor(left, op, right) {
    super()
    this.left = left
    this.token = this.op = op
    this.right = right
  }
   
  accept(visitor) {
    const varName = this.left.value

    if (visitor instanceof SymbolTableBuilder) {
      const hasSymbol = visitor.scope.has(varName)
      if (!hasSymbol) {
        throw new Error(`${varName} is not defined`)
      }

      visitor.visit(this.right)
      return
    }

    const varValue = visitor.visit(this.right)
    const ar = visitor.callStack.peek()
    ar.set(varName, varValue)
  }

}

module.exports = Assign