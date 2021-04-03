const LexicalAnalyzer = require('./src/LexicalAnalyzer')

const lex = new LexicalAnalyzer('31+4')
lex.run()

console.log(lex.tokens)