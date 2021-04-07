const AST = require('./AST')

class Program extends AST {

  constructor(name, block) {
    super()
    this.name = name
    this.block = block
  }

  accept(visitor) {
    visitor.visit(this.block)
  }
   
}

module.exports = Program