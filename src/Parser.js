const TokenTypes = require('./TokenTypes')
const BinOp = require('./BinOp')
const Num = require('./Num')
const UnaryOp = require('./UnaryOp')
const Compound = require('./Compound')
const Assign = require('./Assign')
const NoOp = require('./NoOp')
const Var = require('./Var')
const ADT = require('./ADT')

class Parser {

    constructor(lexer) {
      this.lexer = lexer
      this.currentToken = lexer.getNextToken()
    }

    error() {
      throw new Error(`Parse error at "${this.currentToken.type}" - position ${this.lexer.pos}`)
    }

    program() {
      const node = this.compoundStatement()
      this.consume(TokenTypes.DOT)
      return node
    }

    compoundStatement() {
      this.consume(TokenTypes.BEGIN)
      const nodes = this.statementList()
      this.consume(TokenTypes.END)
      
      const compound = new Compound()
      compound.children = nodes

      return compound
    }

    statementList() {
      const node = this.statement()
      const results = [ node ]

      while (this.currentToken.type === TokenTypes.SEMI) {
        this.consume(TokenTypes.SEMI)
        results.push(this.statement())
      }

      if (this.currentToken.type === TokenTypes.ID) {
        this.error()
      }

      return results
    }

    statement() {
      if (this.currentToken.type === TokenTypes.BEGIN) {
          return this.compoundStatement()
      } else if (this.currentToken.type === TokenTypes.ID) {
          return this.assignmentStatement()
      } else {
        return this.empty()
      }
    }

    assignmentStatement() {
      const left = this.variable()
      const token = this.currentToken
      this.consume(TokenTypes.ASSIGN)
      return new Assign(left, token, this.expr())
    }

    variable() {
      const node = new Var(this.currentToken)
      this.consume(TokenTypes.ID)
      return node
    }

    empty() {
      return new NoOp()
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

      if (token.type === TokenTypes.PLUS_OP) {
        this.consume(TokenTypes.PLUS_OP)
        return new UnaryOp(token, this.factor())
      }
      else if (token.type === TokenTypes.MINUS_OP) {
        this.consume(TokenTypes.MINUS_OP)
        return new UnaryOp(token, this.factor())
      }
      else if (token.type === TokenTypes.NUMBER) {
        this.consume(TokenTypes.NUMBER)
        return new Num(token)
      }
      else if (token.type === TokenTypes.L_PAREN) {
        this.consume(TokenTypes.L_PAREN)
        const node = this.expr()
        this.consume(TokenTypes.R_PAREN)
        return node
      } else if (TokenTypes.ID) {
        return this.variable()
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
      const node = this.program()
      if (this.currentToken.type !== TokenTypes.EOF)
        this.error()

      return node
    }
}

module.exports = Parser