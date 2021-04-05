const AST = require('./AST')

class Compound extends AST {

  constructor() {
    super()
    this.children = []
  }
   
  accept(visitor) {
    this.children.forEach(node => {
      visitor.visit(node)
    })
  }

}

module.exports = Compound