export default {
  api: {
    errorTip: '错误提示',
    timeoutMessage: '登录超时,请重新登录!',
    apiTimeoutMessage: '接口请求超时,请刷新页面重试!',
    apiRequestFailed: '请求出错，请稍候重试',
    networkException: '网络异常',
    networkExceptionMsg: '网络异常，请检查您的网络连接是否正常!',

    errMsg403: '用户得到授权，但是访问是被禁止的。!',
    errMsg404: '网络请求错误,未找到该资源!',
    errMsg405: '网络请求错误,请求方法未允许!',
    errMsg408: '网络请求超时!',
    errMsg500: '服务器错误,请联系管理员!',
    errMsg501: '网络未实现!',
    errMsg502: '网络错误!',
    errMsg503: '服务不可用，服务器暂时过载或维护!',
    errMsg504: '网络超时!',
    errMsg505: 'http版本不支持该请求!',
  },
  exception: {
    backLogin: '返回登录',
    backHome: '返回首页',
    subTitle403: '抱歉，您无权访问此页面。',
    subTitle404: '抱歉，您访问的页面不存在。',
    subTitle500: '抱歉，服务器报告错误。',
    noDataTitle: '当前页无数据',
    networkErrorTitle: '网络错误',
    networkErrorSubTitle: '抱歉，您的网络连接已断开，请检查您的网络！',
  },
  login: {
    backSignIn: '返回',
    signInFormTitle: '登录',
    signUpFormTitle: '注册',
    forgetFormTitle: '重置密码',

    signInTitle: '开箱即用的 m7s 管理系统',
    signInDesc: '流媒体在线管理',

    loginButton: '登录',
    registerButton: '注册账号',
    forgetPassword: '忘记密码?',
    resetButton: '重置',

    // notify
    loginSuccessTitle: '登录成功',
    loginSuccessDesc: '欢迎回来',
    registerSuccessTitle: '注册成功',
    registerSuccessDesc: '即将返回到登录界面',
    resetSuccessTitle: '重置成功',
    resetSuccessDesc: '重置密码成功，请登录邮箱查看密码，并进行激活',

    // placeholder
    mailPlaceholder: '请输入邮箱账号',
    passwordPlaceholder: '请输入密码',
    password2Placeholder: '请输入确认密码',
    verifycodePlaceholder: '请输入邮箱验证码',
    resetPasswordTip:
      '点击重置密码后，请到绑定邮箱中查看重置密码，并点击链接进行激活',
    diffPwd: '两次输入密码不一致',
  },
}
