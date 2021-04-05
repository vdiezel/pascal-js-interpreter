const ADT = {}

function setVar(name, value) {
  ADT[name] = value
}

function getVar(name) {
  return ADT[name]
}

function isStored(name) { return name in ADT }

function getTable() { return ADT }

module.exports = {
  setVar,
  getVar,  
  isStored,
  getTable,
}