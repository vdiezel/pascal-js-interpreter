const AST = require('./AST')

class Procedure extends AST {

  constructor(procName, blockNode) {
    super()
    this.procName = procName
    this.blockNode = blockNode
  }

  accept() {}
   
}

module.exports = Procedure