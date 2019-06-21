const generateEmptyLine = nbChar => '<'.repeat(nbChar)

const _checkReplaceSubStringInput = (str, subStr, position) => {
  if (position + subStr.length > str.length) {
    throw new Error('replaceSubStringAtPosition : invalid input')
  }
}

const replaceSubStringAtPositionToUpCase = (str, subStr, position) => {
  _checkReplaceSubStringInput(str, subStr, position)
  return (
    str.substring(0, position) +
    subStr.toUpperCase() +
    str.substring(position + subStr.length, str.length)
  )
}

const replaceSpecialCharsBySpaces = str => str.replace(/[ |-|-|']/g, '<')

const truncateString = (str, maxLength) => str.substring(0, maxLength)

module.exports = {
  generateEmptyLine,
  replaceSubStringAtPositionToUpCase,
  replaceSpecialCharsBySpaces,
  truncateString
}
