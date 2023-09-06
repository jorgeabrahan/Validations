export interface FormatObject {
  amount: number | Array<number> | 'all' | 'unknown'
  criterias: string | Array<string>
  until?: string // only with amount:unknown
  minAmount?: number // only with amount:unknown
  maxAmount?: number // only with amount:unknown
}
export const FormatAmounts = {
  all: 'all',
  unknown: 'unknown'
}
export const FormatCriterias = {
  numbers: 'N',
  letters: 'L',
  specialChars: 'S'
}

class StringValidation {
  isEmpty(value: string) {
    return value.length === 0
  }
  isNumber(value: string) {
    return !isNaN(Number(value))
  }
  hasLenghtOf(value: string, expectedLength: number) {
    return value.length === expectedLength
  }
  hasMinLengthOf(value: string, expectedMinLength: number) {
    return value.length >= expectedMinLength
  }
  hasMaxLengthOf(value: string, expectedMaxLength: number) {
    return value.length <= expectedMaxLength
  }
  hasLengthRangeOf(value: string, expectedMinLength: number, expectedMaxLength: number) {
    return (
      this.hasMinLengthOf(value, expectedMinLength) && this.hasMaxLengthOf(value, expectedMaxLength)
    )
  }
  hasSpaces(value: string) {
    return value.trim().includes(' ')
  }
  hasSpecialChars(value: string) {
    return /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value)
  }
  hasOnlySpecialChars(value: string) {
    return /^[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]+$/.test(value)
  }
  hasNumbers(value: string) {
    return /\d/.test(value)
  }
  hasOnlyNumbers(value: string) {
    return /^\d+$/.test(value)
  }
  hasLetters(value: string) {
    return /[A-Za-z]/.test(value)
  }
  hasOnlyLetters(value: string) {
    return /^[a-zA-Z]+$/.test(value)
  }
  hasCapitalLetters(value: string) {
    return /[A-Z]/.test(value)
  }
  hasOnlyCapitalLetters(value: string) {
    return /^[A-Z]+$/.test(value)
  }
  hasLowerCaseLetters(value: string) {
    return /[a-z]/.test(value)
  }
  hasOnlyLowerCaseLetters(value: string) {
    return /^[a-z]+$/.test(value)
  }
  #evaluateCriteria(criteria: string, char: string) {
    switch (criteria) {
      case FormatCriterias.numbers:
        if (!this.hasOnlyNumbers(char)) return false
        break
      case FormatCriterias.specialChars:
        if (!this.hasOnlySpecialChars(char)) return false
        break
      case FormatCriterias.letters:
        if (!this.hasOnlyLetters(char)) return false
        break
      default:
        if (char.toLowerCase() !== criteria.toLowerCase()) return false
    }
    return true
  }
  #evaluateNumberFormat(
    lastValidatedIndex: number,
    amount: number,
    criterias: Array<string>,
    value: string
  ) {
    for (; lastValidatedIndex < amount; lastValidatedIndex++) {
      if (lastValidatedIndex >= value.length) return false
      const fitsAtLeastOneCriteria = criterias.some((criteria) => {
        if (criteria.length !== 1) return false
        return this.#evaluateCriteria(criteria, value[lastValidatedIndex])
      })
      if (!fitsAtLeastOneCriteria) return false
    }
    return true
  }
  hasFormat(value: string, format: string) {
    // format: S -> symbol, N -> number, L -> letter
    if (value.length !== format.length) return false
    for (let i = 0; i < value.length; i++) {
      if (!this.#evaluateCriteria(format[i], value[i])) return false
    }
    return true
  }
  hasComplexFormat(value: string, formats: Array<FormatObject>) {
    let lastValidatedIndex = 0
    for (let format of formats) {
      // always convert criteria to array
      const criterias = typeof format.criterias === 'string' ? [format.criterias] : format.criterias
      if (typeof format.amount === 'number') {
        // if format amount is not valid
        if (!Number.isInteger(format.amount) || format.amount < 0) return false
        const isValid = this.#evaluateNumberFormat(
          lastValidatedIndex,
          lastValidatedIndex + format.amount,
          criterias,
          value
        )
        lastValidatedIndex += format.amount
        if (!isValid) return false
        continue // evaluate next format
      }
      if (typeof format.amount === 'string') {
        if (format.amount === FormatAmounts.all) {
          const isValid = this.#evaluateNumberFormat(
            lastValidatedIndex,
            value.length,
            criterias,
            value
          )
          // returns validation result since all characters where already checked
          return isValid
        }
        if (format.amount === FormatAmounts.unknown) {
          // if format.until is not specified or not valid
          if (
            typeof format.until !== 'string' ||
            format.until.length !== 1 ||
            format.until === null
          )
            return false
          const [left] = value.split(format.until)
          const sliceToEvaluate = value.slice(lastValidatedIndex, left.length)
          if (
            format.minAmount !== null &&
            format.minAmount !== 0 &&
            Number.isInteger(format.minAmount) &&
            format.minAmount?.isPositive() &&
            sliceToEvaluate.length < format.minAmount
          ) return false
          if (
            format.maxAmount !== null &&
            format.maxAmount !== 0 &&
            Number.isInteger(format.maxAmount) &&
            format.maxAmount?.isPositive() &&
            sliceToEvaluate.length > format.maxAmount
          ) return false

          const isValid = this.#evaluateNumberFormat(
            lastValidatedIndex,
            left.length,
            criterias,
            value
          )
          lastValidatedIndex = left.length
          if (!isValid) return false
        }
        continue // evaluate next format
      }
      if (!Array.isArray(format.amount)) return false
      // if format amount is an array
      let maxAmount = Math.max(...format.amount)
      const validateUntil = lastValidatedIndex + maxAmount
      if (value.length < validateUntil) {
        const remainingAmount = maxAmount - (validateUntil - value.length)
        const remainingAmountExists = format.amount.some((amount) => amount === remainingAmount)
        if (!remainingAmountExists) return false
        maxAmount = remainingAmount
      }
      if (value.length > validateUntil) return false
      const isValid = this.#evaluateNumberFormat(
        lastValidatedIndex,
        lastValidatedIndex + maxAmount,
        criterias,
        value
      )
      if (!isValid) return false
    }
    return true
  }
  countOccurrences(value: string, chars: string): number | Array<number> {
    const occurrences = new Array(chars.length).fill(0)
    for (let i = 0; i < chars.length; i++) {
      const charRegEx = new RegExp(chars[i], 'ig')
      const matches = value.match(charRegEx) ?? []
      occurrences[i] = matches.length
    }
    if (occurrences.length === 1) return occurrences[0]
    return occurrences
  }
  toSingleSpaced(value: string): string {
    return value.replace(/\s+/g, ' ')
  }
  removeChars(value: string, charsToRemove: string, justOnce: boolean): string {
    let valueCopy = value
    for (let char of charsToRemove) {
      if (justOnce) valueCopy = valueCopy.replace(char, '')
      else valueCopy = valueCopy.replaceAll(char, '')
    }
    return valueCopy
  }
  removeWord(value: string, wordToRemove: string, justOnce: boolean): string {
    if (justOnce) return value.replace(wordToRemove, '')
    return value.replaceAll(wordToRemove, '')
  }
  removeRepeatedChars(value: string): string {
    const set = new Set()
    for (let char of value) set.add(char)
    return [...set].join('')
  }
}

export const sv = new StringValidation()
