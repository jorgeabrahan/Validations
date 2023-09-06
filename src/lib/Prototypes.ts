import { sv, nv, type FormatObject } from './'

declare global {
  interface String {
    isEmpty: () => boolean
    isNumber: () => boolean
    hasLenghtOf: (expectedLength: number) => boolean
    hasMinLengthOf: (expectedMinLength: number) => boolean
    hasMaxLengthOf: (expectedMaxLength: number) => boolean
    hasLengthRangeOf: (expectedMinLength: number, expectedMaxLength: number) => boolean
    hasSpaces: () => boolean
    hasSpecialChars: () => boolean
    hasOnlySpecialChars: () => boolean
    hasNumbers: () => boolean
    hasOnlyNumbers: () => boolean
    hasLetters: () => boolean
    hasOnlyLetters: () => boolean
    hasCapitalLetters: () => boolean
    hasOnlyCapitalLetters: () => boolean
    hasLowerCaseLetters: () => boolean
    hasOnlyLowerCaseLetters: () => boolean
    hasFormat: (format: string) => boolean
    hasComplexFormat: (formats: Array<FormatObject>) => boolean
    countOccurrences: (chars: string) => number | Array<number>

    toSingleSpaced: () => string
    toCapitalized: () => string
    toCamelCase: () => string
    toDromedaryCase: () => string
    removeChars: (charsToRemove: string, justOnce?: boolean) => string
    removeWord: (wordToRemove: string, justOnce?: boolean) => string
    removeRepeatedChars: () => string
  }
  interface Number {
    isPositive: () => boolean
    isNegative: () => boolean
    isFloat: () => boolean
    isZero: () => boolean
    isBetween: (min: number, max: number, includeLimits?: boolean) => boolean
    toFraction: (simplify?: boolean) => [number, number]
  }
}

String.prototype.isEmpty = function () {
  return sv.isEmpty(this.toString())
}
String.prototype.isNumber = function () {
  return sv.isNumber(this.toString())
}
String.prototype.hasLenghtOf = function (expectedLength) {
  return sv.hasLenghtOf(this.toString(), expectedLength)
}
String.prototype.hasMinLengthOf = function (expectedMinLength) {
  return sv.hasMinLengthOf(this.toString(), expectedMinLength)
}
String.prototype.hasMaxLengthOf = function (expectedMaxLength) {
  return sv.hasMaxLengthOf(this.toString(), expectedMaxLength)
}
String.prototype.hasLengthRangeOf = function (expectedMinLength, expectedMaxLength) {
  return sv.hasLengthRangeOf(this.toString(), expectedMinLength, expectedMaxLength)
}
String.prototype.hasSpaces = function () {
  return sv.hasSpaces(this.toString())
}
String.prototype.hasSpecialChars = function () {
  return sv.hasSpecialChars(this.toString())
}
String.prototype.hasOnlySpecialChars = function () {
  return sv.hasOnlySpecialChars(this.toString())
}
String.prototype.hasNumbers = function () {
  return sv.hasNumbers(this.toString())
}
String.prototype.hasOnlyNumbers = function () {
  return sv.hasOnlyNumbers(this.toString())
}
String.prototype.hasLetters = function () {
  return sv.hasLetters(this.toString())
}
String.prototype.hasOnlyLetters = function () {
  return sv.hasOnlyLetters(this.toString())
}
String.prototype.hasCapitalLetters = function () {
  return sv.hasCapitalLetters(this.toString())
}
String.prototype.hasOnlyCapitalLetters = function () {
  return sv.hasOnlyCapitalLetters(this.toString())
}
String.prototype.hasLowerCaseLetters = function () {
  return sv.hasLowerCaseLetters(this.toString())
}
String.prototype.hasOnlyLowerCaseLetters = function () {
  return sv.hasOnlyLowerCaseLetters(this.toString())
}
String.prototype.hasFormat = function (format) {
  return sv.hasFormat(this.toString(), format)
}
String.prototype.hasComplexFormat = function (formats) {
  return sv.hasComplexFormat(this.toString(), formats)
}
String.prototype.countOccurrences = function (chars) {
  return sv.countOccurrences(this.toString(), chars)
}
String.prototype.toSingleSpaced = function () {
  return sv.toSingleSpaced(this.toString())
}
String.prototype.toCapitalized = function () {
  return sv.toCapitalized(this.toString())
}
String.prototype.toCamelCase = function () {
  return sv.toCamelCase(this.toString())
}
String.prototype.toDromedaryCase = function () {
  return sv.toDromedaryCase(this.toString())
}
String.prototype.removeChars = function (charsToRemove, justOnce = false) {
  return sv.removeChars(this.toString(), charsToRemove, justOnce)
}
String.prototype.removeWord = function (wordToRemove, justOnce = false) {
  return sv.removeWord(this.toString(), wordToRemove, justOnce)
}
String.prototype.removeRepeatedChars = function () {
  return sv.removeRepeatedChars(this.toString())
}

Number.prototype.isPositive = function () {
  return nv.isPositive(Number(this))
}
Number.prototype.isNegative = function () {
  return nv.isNegative(Number(this))
}
Number.prototype.isFloat = function () {
  return nv.isFloat(Number(this))
}
Number.prototype.isZero = function () {
  return nv.isZero(Number(this))
}
Number.prototype.isBetween = function (min, max, includeLimits = false) {
  return nv.isBetween(Number(this), min, max, includeLimits)
}
Number.prototype.toFraction = function (simplify = false) {
  return nv.toFraction(Number(this), simplify)
}
