const AST = require('./AST')

class Type extends AST {

  constructor(token) {
    super()
    this.token = token
  }

  get value() {
    return this.token.value
  }

  accept() {}
   
}

module.exports = Type