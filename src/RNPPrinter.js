// takes an AST and prints it in RPN format
// by using post order traversal

class RNPPrinter {

  static traverse(node) {

    if (node.left) {
      this.traverse(node.left)
    }

    if (node.right) {
      this.traverse(node.right)
    }

    console.log(node.value || node.op.value)
  }

  static print(tree) {
    this.traverse(tree)
  }


}

module.exports = RNPPrinter