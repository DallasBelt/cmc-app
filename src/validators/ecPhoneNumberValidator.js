export function ecPhoneNumberValidator(phoneNumber) {
  // Check if the number has exactly 10 digits
  if (phoneNumber.length !== 10) {
    return false;
  }

  // Check if the first digit is '0' and the second digit is '9'
  if (phoneNumber.charAt(0) !== '0' || phoneNumber.charAt(1) !== '9') {
    return false;
  }

  // Check if the third digit is in the range 2 to 9
  const thirdDigit = parseInt(phoneNumber.charAt(2), 10);
  if (thirdDigit < 2 || thirdDigit > 9) {
    return false;
  }

  return true;
}
