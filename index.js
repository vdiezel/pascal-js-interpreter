const LexicalAnalyzer = require('./src/LexicalAnalyzer')
const Parser = require('./src/Parser')

const lex = new LexicalAnalyzer('31+4 - (2 * 3 / 2)')
const parser = new Parser(lex)

const res = parser.expr()