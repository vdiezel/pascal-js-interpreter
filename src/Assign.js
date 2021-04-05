const AST = require('./AST')
const { setVar } = require('./ADT')

class Assign extends AST {

  constructor(left, op, right) {
    super()
    this.left = left
    this.token = this.op = op
    this.right = right
  }
   
  accept(visitor) {
    setVar(this.left.value, visitor.visit(this.right))
  }

}

module.exports = Assign