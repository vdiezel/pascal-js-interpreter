class ActivationRecord {

  constructor(name, type, nestingLevel) {
    this.name = name
    this.type = type
    this.nestingLevel = nestingLevel
    this.members = {}
  }

  set(key, value) {
    this.members[key] = value
  }
  
  get(key) {
    return this.members[key]
  }

}

module.exports = ActivationRecord