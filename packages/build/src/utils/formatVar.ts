function splitVar(varName: string) {
  const reg = /A{2,}(?=[A-Z][a-z]+|\d|[^a-zA-Z0-9])|[A-Z]?[a-z]+|[A-Z]\d/g
  return varName.match(reg)
}

export function kebabCase(varName: string) {
  const arr = splitVar(varName)!
  return arr.map(item => item.toLowerCase()).join('-')
}

export function camelCase(varName: string, isFirstWordUpper = false) {
  const arr = splitVar(varName)!
  return arr.map((item, index) => {
    if (index === 0 && !isFirstWordUpper) {
      return item.toLowerCase()
    }
    return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
  }).join('')
}
