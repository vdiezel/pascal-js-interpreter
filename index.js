const Interpreter = require('./src/Interpreter')
const LexicalAnalyzer = require('./src/LexicalAnalyzer')
const Parser = require('./src/Parser')
const RNPPrinter = require('./src/RNPPrinter')

const lex = new LexicalAnalyzer('(5 + 3) * 12 / 3')
const parser = new Parser(lex)
const tree = parser.parse()
RNPPrinter.print(tree)

