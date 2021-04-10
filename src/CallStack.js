class CallStack {

  constructor() {
    this.items = []
  }

  push(item) {
    this.items.push(item)
  }

  pop() {
    return this.items.pop()
  }

  peek() {
    return this.items[this.items.length - 1]
  }

  print() {
    this.items.reverse().forEach(console.log)
  }

}

module.exports = CallStack