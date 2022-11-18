function postIsValid(title, content) {
  if (!title || !content || title.trim() === '' || content.trim() === '') {
    return false;
  }
  return true;
}

function signupIsValid(email, confirmEmail, password) {
  if (
    !email ||
    !confirmEmail ||
    !password ||
    password.trim().length < 6 ||
    email !== confirmEmail ||
    !email.includes('@')
  ) {
    return false;
  }
  return true;
}

module.exports = {
  postIsValid: postIsValid,
  signupIsValid: signupIsValid,
};
