export function ecIdValidator(id) {
  if (id.length !== 10) {
    return false;
  }

  const firstDigit = parseInt(id.charAt(0), 10);
  if (isNaN(firstDigit)) {
    return false;
  }

  if (firstDigit < 0 || firstDigit > 9) {
    return false;
  }

  const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  const weightedSum = id
    .substring(0, 9)
    .split('')
    .map((digit, index) => parseInt(digit, 10) * coefficients[index])
    .reduce((sum, value) => sum + (value >= 10 ? value - 9 : value), 0);

  const calculatedVerificationDigit =
    weightedSum % 10 === 0 ? 0 : 10 - (weightedSum % 10);
  const verificationDigit = parseInt(id.charAt(9), 10);

  return calculatedVerificationDigit === verificationDigit;
}
