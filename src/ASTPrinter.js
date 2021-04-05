// takes an AST and prints it in RPN format

class ASTPrinter {

  static traversePreOrder(node) {
    if (node.op) {
      console.log('(')
    }

    console.log(node.value || node.op.value)

    if (node.left) {
      this.traversePreOrder(node.left)
    }

    if (node.right) {
      this.traversePreOrder(node.right)
      console.log(')')
    }

  }

  static traversePostOrder(node) {

    if (node.left) {
      this.traversePostOrder(node.left)
    }

    if (node.right) {
      this.traversePostOrder(node.right)
    }

    console.log(node.value || node.op.value)
  }

  static printRNP(tree) {
    this.traversePostOrder(tree)
  }

  static printLISPStyle(tree) {
    this.traversePreOrder(tree)
  }

}

module.exports = ASTPrinter