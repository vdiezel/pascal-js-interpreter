const { add, subtract, multiply, divide } = require('./operations')
const TokenTypes = require('./TokenTypes')

class Parser {

    constructor(lexer) {
      this.lexer = lexer
      this.currentToken = lexer.getNextToken()
    }

    error() {
      throw new Error(`Parse error at ${this.currentToken}`)
    }

    consume(tokenType) {
      if (this.currentToken.type === tokenType) {
        this.currentToken = this.lexer.getNextToken()
      } else {
        this.error()
      }
    }

    factor() {
      const token = this.currentToken
      if (token.type === TokenTypes.NUMBER) {
        this.consume(TokenTypes.NUMBER)
        return token.value
      }
      else if (this.currentToken.type === TokenTypes.L_PAREN) {
        this.consume(TokenTypes.L_PAREN)
        const res = this.expr()
        this.consume(TokenTypes.R_PAREN)
        return res
      }
    }

    term() {
      let res = this.factor()
      while ([TokenTypes.DIVIDE_OP, TokenTypes.MULTIPLY_OP].includes(this.currentToken.type)) {
        if (this.currentToken.type === TokenTypes.DIVIDE_OP) {
          this.consume(TokenTypes.DIVIDE_OP) 
          res = Math.round(res / this.factor()) // no support for floats yet
        } else if (this.currentToken.type === TokenTypes.MULTIPLY_OP) {
          this.consume(TokenTypes.MULTIPLY_OP) 
          res *= this.factor()
        }
      }

      return res
    }

    expr() {
      let res = this.term()
      while ([TokenTypes.PLUS_OP, TokenTypes.MINUS_OP].includes(this.currentToken.type)) {
        if (this.currentToken.type === TokenTypes.MINUS_OP) {
          this.consume(TokenTypes.MINUS_OP) 
          res -= this.term()
        } else if (this.currentToken.type === TokenTypes.PLUS_OP) {
          this.consume(TokenTypes.PLUS_OP) 
          res += this.term()
        }
      }

      return res

    }
}

module.exports = Parser