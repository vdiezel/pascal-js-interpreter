const AST = require('./AST')

class Num extends AST {

  constructor(token) {
    super()
    this.token = token
  }

  get value() {
    return this.token.value
  }

  accept() {
    return this.value
  }
   
}

module.exports = Num