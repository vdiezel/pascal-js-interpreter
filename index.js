const Interpreter = require('./src/Interpreter')
const LexicalAnalyzer = require('./src/LexicalAnalyzer')
const Parser = require('./src/Parser')
const ASTPrinter = require('./src/ASTPrinter')

const lex = new LexicalAnalyzer('2 + 3 * 5')
const parser = new Parser(lex)
const tree = parser.parse()
ASTPrinter.printLISPStyle(tree)
//ASTPrinter.printRNP(tree)

