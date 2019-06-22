const {
  generateEmptyLine,
  replaceSubStringAtPositionToUpCase,
  replaceSpecialCharsBySpaces,
  truncateString
} = require('../services/string')

const { checkDigitCalculation } = require('../services/check-digit')

const {
  generateDateWithCheckDigit,
  generatePassportNumber,
  generateSex,
  generatePassportType,
  generateCountryCode,
  generateSurnameAndGivenNames
} = require('./common')

const lineLength = 44

const generateMrzTd3 = data =>
  `${_generateLine1(data)}\n${_generateLine2(data)}`

const _generateLine1 = ({ passport, user }) => {
  let line = generateEmptyLine(lineLength)
  line = generatePassportType(line, passport)
  line = generateCountryCode(line, passport.issuingCountry, 2)
  line = generateSurnameAndGivenNames(line, user, 5, lineLength)
  return line
}

const _generateLine2 = ({ passport, user }) => {
  let line = generateEmptyLine(lineLength)
  line = generatePassportNumber(line, passport, 0)
  line = _generateUserNationality(line, user)
  line = _generateDateOfBirth(line, user)
  line = generateSex(line, user, 20)
  line = _generateExpirationDate(line, passport)
  line = _generateOptionalField(line, passport)
  return _generateGlobalDigitCheck(line)
}

const _generateUserNationality = (line, user) =>
  replaceSubStringAtPositionToUpCase(line, user.nationality, 10)

const _generateDateOfBirth = (line, user) =>
  generateDateWithCheckDigit(line, user.dateOfBirth, 13)

const _generateExpirationDate = (line, passport) =>
  generateDateWithCheckDigit(line, passport.expirationDate, 21)

const _generateOptionalField = (line, passport) => {
  let field = truncateString(passport.optionalField1.toUpperCase(), 14)
  field = replaceSpecialCharsBySpaces(field)
  line = replaceSubStringAtPositionToUpCase(line, field, 28)
  const digitCheck = checkDigitCalculation(field)
  return replaceSubStringAtPositionToUpCase(line, digitCheck, 42)
}

const _generateGlobalDigitCheck = line => {
  let stringToBeChecked =
    line.slice(0, 10) + line.slice(13, 20) + line.slice(21, 43)
  const digitCheck = checkDigitCalculation(stringToBeChecked)
  return replaceSubStringAtPositionToUpCase(line, digitCheck, 43)
}

module.exports = { generateMrzTd3 }
