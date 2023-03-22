const verifyParams = (names, surnames, email, password) => {
  const errors = {};
  if (!names) {
    errors.names = 'Names are required';
  }
  if (!surnames) {
    errors.surnames = 'Surnames are required';
  }
  if (!email) {
    errors.email = 'Email are required';
  }
  if (!password) {
    errors.password = 'Password are required';
  }
  if(password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  if(email.length < 6) {
    errors.email = 'The email writed is invalid.';
  }
  if(names.length < 2) {
    errors.names = 'The names writed are invalid.';
  }
  if(surnames.length < 2) {
    errors.surnames = 'The surnames writed are invalid.';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}

module.exports = verifyParams;