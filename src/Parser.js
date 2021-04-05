const { add, subtract, multiply, divide } = require('./operations')
const TokenTypes = require('./TokenTypes')
const BinOp = require('./BinOp')
const Num = require('./Num')

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
        return new Num(token)
      }
      else if (this.currentToken.type === TokenTypes.L_PAREN) {
        this.consume(TokenTypes.L_PAREN)
        const node = this.expr()
        this.consume(TokenTypes.R_PAREN)
        return node
      }
    }

    term() {
      let node = this.factor()
      while ([TokenTypes.DIVIDE_OP, TokenTypes.MULTIPLY_OP].includes(this.currentToken.type)) {
        const token = this.currentToken
        if (token.type === TokenTypes.DIVIDE_OP) {
          this.consume(TokenTypes.DIVIDE_OP) 
        } else if (token.type === TokenTypes.MULTIPLY_OP) {
          this.consume(TokenTypes.MULTIPLY_OP) 
        }

        node = new BinOp(node, token, this.factor())
      }

      return node
    }

    expr() {
      let node = this.term()
      while ([TokenTypes.PLUS_OP, TokenTypes.MINUS_OP].includes(this.currentToken.type)) {
        const token = this.currentToken
        if (token.type === TokenTypes.MINUS_OP) {
          this.consume(TokenTypes.MINUS_OP) 
        } else if (token.type === TokenTypes.PLUS_OP) {
          this.consume(TokenTypes.PLUS_OP) 
        }

        node = new BinOp(node, token, this.term())
      }

      return node
    }

    parse() {
      return this.expr()
    }
}

module.exports = Parser