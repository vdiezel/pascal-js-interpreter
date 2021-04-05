const AST = require('./AST')

class NoOp extends AST {

  constructor() {
    super()   
  }

  accept() { }
}

module.exports = NoOp