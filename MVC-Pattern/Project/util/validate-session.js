// refactoring

function getSessionErrorData(req, defaultValues) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      ...defaultValues,
    };
  }

  req.session.inputData = null;
  return sessionInputData;
}

// store errors on a session temporarily
function flashErrorsToSession(req, data, action) {
  req.session.inputData = {
    hasError: true,
    ...data, // spread operator
  };
  req.session.save(action);
}

module.exports = {
  getSessionErrorData: getSessionErrorData,
  flashErrorsToSession: flashErrorsToSession,
};
