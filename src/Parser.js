const TokenTypes = require('./TokenTypes')
const BinOp = require('./BinOp')
const Num = require('./Num')
const UnaryOp = require('./UnaryOp')
const Compound = require('./Compound')
const Assign = require('./Assign')
const NoOp = require('./NoOp')
const Var = require('./Var')
const Block = require('./Block')
const VarDecl = require('./VarDecl')
const Type = require('./Type')
const Program = require('./Program')
const ProcedureDecl = require('./ProcedureDecl')
const Param = require('./Param')
const { ParserError, ERROR_CODES } = require('./Error')

class Parser {

    constructor(lexer) {
      this.lexer = lexer
      this.currentToken = lexer.getNextToken()
    }

    error(errorCode, token) {
      throw new ParserError({
         message: `${errorCode} -> "${token.value}" line ${token.lineno} colum ${token.column}`,
         token,
         errorCode,
       })
    }

    program() {
      this.consume(TokenTypes.PROGRAM)
      const varNode = this.variable()
      const progName = varNode.value
      this.consume(TokenTypes.SEMI)
      const blockNode = this.block()
      const progNode = new Program(progName, blockNode)
      this.consume(TokenTypes.DOT)
      return progNode
    }

    block() {
      const declarations = this.declarations()
      const compoundStatement = this.compoundStatement()
      return new Block(declarations, compoundStatement)
    }

    procedureDeclaration() {
      this.consume(TokenTypes.PROCEDURE)
      const procName = this.currentToken.value
      this.consume(TokenTypes.ID)
      let params = []

      if (this.currentToken.type === TokenTypes.L_PAREN) {
        this.consume(TokenTypes.L_PAREN)
        params = this.formalParameterList()
        this.consume(TokenTypes.R_PAREN)
      }

      this.consume(TokenTypes.SEMI)
      const block = this.block()
      const procDecl = new ProcedureDecl(procName, params, block)
      this.consume(TokenTypes.SEMI)
      return procDecl
    }

    declarations() {
      const declarations = []

      if (this.currentToken.type === TokenTypes.VAR) {
        this.consume(TokenTypes.VAR)
        while (this.currentToken.type === TokenTypes.ID) {
          declarations.push(...this.varDeclaration())
          this.consume(TokenTypes.SEMI)
        }
      }

      while (this.currentToken.type === TokenTypes.PROCEDURE) {
        const procDecl = this.procedureDeclaration()
        declarations.push(procDecl)
      }

      return declarations
    }

    varDeclaration() {
      const varNodes = [ new Var(this.currentToken) ]
      this.consume(TokenTypes.ID)

      while (this.currentToken.type === TokenTypes.COMMA) {
        this.consume(TokenTypes.COMMA)
        varNodes.push(new Var(this.currentToken))
        this.consume(TokenTypes.ID)
      }

      this.consume(TokenTypes.COLON)
      const typeNode = this.typeSpec()

      return varNodes.map(varNode => new VarDecl(varNode, typeNode))
    }

    typeSpec() {
      const token = this.currentToken
      if (token.type === TokenTypes.INTEGER) {
        this.consume(TokenTypes.INTEGER)
      } else {
        this.consume(TokenTypes.REAL)
      }

      return new Type(token)
    }

    compoundStatement() {
      this.consume(TokenTypes.BEGIN)
      const nodes = this.statementList()
      this.consume(TokenTypes.END)
      
      const compound = new Compound()
      compound.children = nodes

      return compound
    }

    formalParameterList() {
      if (this.currentToken.type !== TokenTypes.ID) {
        return []
      }

      let paramNodes = this.formalParameters()

      while (this.currentToken.type === TokenTypes.SEMI) {
        this.consume(TokenTypes.SEMI)
        paramNodes = [ ...paramNodes, this.formalParameters()]
      }

      return paramNodes
    }

    formalParameters() {
      const paramNodes = []
      const paramTokens = [ this.currentToken ]
      this.consume(TokenTypes.ID)
      while (this.currentToken.type === TokenTypes.COMMA) {
        this.consume(TokenTypes.COMMA)
        paramTokens.push(this.currentToken)
        this.consume(TokenTypes.ID)
      }

      this.consume(TokenTypes.COLON)
      const type = this.typeSpec()

      for (const token of paramTokens) {
        paramNodes.push(new Param(new Var(token), type))
      }

      return paramNodes
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
        this.error(ERROR_CODES.UNEXPECTED_TOKEN, this.currentToken)
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
      else if (token.type === TokenTypes.INTEGER_CONST) {
        this.consume(TokenTypes.INTEGER_CONST)
        return new Num(token)
      }
      else if (token.type === TokenTypes.REAL_CONST) {
        this.consume(TokenTypes.REAL_CONST)
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
      while ([TokenTypes.DIVIDE_OP, TokenTypes.MULTIPLY_OP, TokenTypes.INT_DIVIDE_OP].includes(this.currentToken.type)) {
        const token = this.currentToken
        if (token.type === TokenTypes.DIVIDE_OP) {
          this.consume(TokenTypes.DIVIDE_OP) 
        } else if (token.type === TokenTypes.MULTIPLY_OP) {
          this.consume(TokenTypes.MULTIPLY_OP) 
        } else if (token.type === TokenTypes.INT_DIVIDE_OP) {
          this.consume(TokenTypes.INT_DIVIDE_OP) 
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