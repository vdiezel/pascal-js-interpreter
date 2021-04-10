const AST = require('./AST')
const SymbolTableBuilder = require('./SymbolTableBuilder')
const ScopedSymbolTable = require('./ScopedSymbolTable')
const ActivationRecord = require('./ActivationRecord')

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
      const ar = new ActivationRecord(this.name, 'PROGRAM', 1)
      console.log(ar)
      visitor.callStack.push(ar)
      visitor.visit(this.block)
      console.log(ar)
      visitor.callStack.pop()
    }
  }
   
}

module.exports = Program