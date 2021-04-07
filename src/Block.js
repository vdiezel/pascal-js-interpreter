const AST = require('./AST')

class Block extends AST {

  constructor(declarations, compoundStatement) {
    super()
    this.declarations = declarations
    this.compoundStatement = compoundStatement
  }

  accept(visitor) {
    this.declarations.forEach(decl => {
      visitor.visit(decl)
    })

    visitor.visit(this.compoundStatement) 
  }
   
}

module.exports = Block