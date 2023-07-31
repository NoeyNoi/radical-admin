export default {
  api: {
    errorTip: 'Error Tip',
    timeoutMessage: 'Login timed out, please log in again!',
    apiTimeoutMessage:
      'The interface request timed out, please refresh the page and try again!',
    apiRequestFailed: 'The interface request failed, please try again later!',
    networkException: 'network anomaly',
    networkExceptionMsg:
      'Please check if your network connection is normal! The network is abnormal',

    errMsg403: 'The user is authorized, but access is forbidden!',
    errMsg404: 'Network request error, the resource was not found!',
    errMsg405: 'Network request error, request method not allowed!',
    errMsg408: 'Network request timed out!',
    errMsg500: 'Server error, please contact the administrator!',
    errMsg501: 'The network is not implemented!',
    errMsg502: 'Network Error!',
    errMsg503:
      'The service is unavailable, the server is temporarily overloaded or maintained!',
    errMsg504: 'Network timeout!',
    errMsg505: 'The http version does not support the request!',
  },
  exception: {
    backLogin: 'Back Login',
    backHome: 'Back Home',
    subTitle403: "Sorry, you don't have access to this page.",
    subTitle404: 'Sorry, the page you visited does not exist.',
    subTitle500: 'Sorry, the server is reporting an error.',
    noDataTitle: 'No data on the current page.',
    networkErrorTitle: 'Network Error',
    networkErrorSubTitle:
      'Sorry，Your network connection has been disconnected, please check your network!',
  },
  login: {
    backSignIn: 'Back sign in',
    signInFormTitle: 'Sign in',
    signUpFormTitle: 'Sign up',
    forgetFormTitle: 'Reset password',

    signInTitle: 'Backstage management system for m7s',
    signInDesc: 'Streaming Media Online Management',

    loginButton: 'Sign in',
    registerButton: 'Sign up',
    rememberMe: 'Remember me',
    forgetPassword: 'Forget Password?',
    otherSignIn: 'Sign in with',

    // notify
    loginSuccessTitle: 'Login successful',
    loginSuccessDesc: 'Welcome back',
    registerSuccessTitle: 'Register successful',
    registerSuccessDesc: 'About to return to the login page',
    resetSuccessTitle: 'Reset successful',
    resetSuccessDesc:
      'Password reset successful. Please log in to the email to view the password and activate it',

    // placeholder
    mailPlaceholder: 'Please input mail',
    passwordPlaceholder: 'Please input password',
    password2Placeholder: 'Please input password again',
    verifycodePlaceholder: 'Please enter the email verification code',
    resetPasswordTip:
      'After clicking on reset password, please go to the binding email to view the reset password and click the link to activate it',
    diffPwd: 'The two passwords are inconsistent',
  },
}
