const py_module = require('./py_module.py')
console.log('console.log py_module:', py_module)
module.exports = {
    print: py_module.print,
    set: py_module.set,
    get: py_module.get,
    get2: py_module.get2,
}