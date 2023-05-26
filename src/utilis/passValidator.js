export default function validatePassword(password) {
  const minLength = 8
  const maxLength = 30
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSequentialChars =
    /(012345|123456|234567|345678|456789|567890|qwerty|asdfgh|zxcvbn|asdfghjkl|qwertyuiop|zxcvbnm)/i.test(
      password
    )

  if (password.length < minLength) {
    return 'Password must be at least 8 characters long.'
  }

  if (password.length > maxLength) {
    return 'Password cannot exceed 30 characters.'
  }

  if (!hasUppercase || !hasLowercase) {
    return 'Password must contain both uppercase and lowercase letters.'
  }

  if (!hasNumber) {
    return 'Password must contain at least one numeric digit.'
  }

  if (hasSequentialChars) {
    return 'Password cannot contain sequential characters.'
  }

  return 'Valid'
}
