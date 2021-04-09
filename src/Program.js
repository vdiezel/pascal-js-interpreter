const AST = require('./AST')
const SymbolTableBuilder = require('./SymbolTableBuilder')
const ScopedSymbolTable = require('./ScopedSymbolTable')

class Program extends AST {

  constructor(name, block) {
    super()
    this.name = name
    this.block = block
  }

  accept(visitor) {
    if (visitor instanceof SymbolTableBuilder) { 
      const globalScope = new ScopedSymbolTable('global', 1, visitor.scope)
      globalScope._initBuiltIns()
      visitor.scope = globalScope
      visitor.visit(this.block)
      visitor.scope = visitor.scope.enclosingScope
    } else {
      visitor.visit(this.block)
    }
  }
   
}

module.exports = Program