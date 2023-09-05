class NumberValidation {
  isPositive(value: number) {
    return value > 0
  }
  isNegative(value: number) {
    return value < 0
  }
  isFloat(value: number) {
    return !Number.isInteger(value)
  }
  isZero(value: number) {
    return value === 0
  }
  isBetween(value: number, min: number, max: number, includeLimits: boolean = false) {
    return includeLimits ? value >= min && value <= max : value > min && value < max
  }
  toFraction(value: number, simplify: boolean = false): [number, number] {
    if (!value.isFloat()) return [value, 1]
    const [, fractionalNumbers] = value.toString().split('.')
    const denominator = Math.pow(10, fractionalNumbers.length)
    const numerator = value * denominator
    const fraction: [number, number] = [numerator, denominator]
    const gcd = this.GCD(fraction)
    return simplify ? [numerator / gcd, denominator / gcd] : fraction
  }
  GCD(value: [number, number]) {
    let [numerator, denominator] = value
    if (!Number.isInteger(numerator) || !Number.isInteger(denominator)) return 1
    let difference = numerator % denominator
    let temporal = difference
    while (difference !== 0) {
      difference = denominator % temporal
      denominator = temporal
      temporal = difference
    }
    return denominator.isNegative() ? denominator * -1 : denominator
  }
}

export const nv = new NumberValidation()
