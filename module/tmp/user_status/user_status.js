"use strict";

class UserStatus {
  /**
   * 检查用户是否登录，如果没有登录，跳至登录界面，且成功后返回。
   *
   * @param url 登录页面的url
   */
  static checkLogin() {
    let url = `${Configure.getProjectPath(2)}lego/lego_user?servletName=getUserSecurityByUser`;
    let result = Toolkit.ajaxAssistant(url, {}, false, true, false);
    if (1 == result.status) {
      if (1 == result.count) {
        // 已登录
        return;
      }
    }
    // 未登录
    window.location.href = "../index/login.html?redirect=" + window.location.href;
    window.onerror = function(s) {
      if ("user_not_login" == s) {
        // 返回true，浏览器不会提示错误信息。
        return true;
      }
    }
    throw new Error("user_not_login");
  }

  /**
   * 用户名不能为空的getter
   */
  static get NAME_NO_DATA() {
    return "name_no_data";
  }

  /**
   * 密码不能为空的getter
   */
  static get PASSWORD_NO_DATA() {
    return "password_no_data";
  }

  /**
   * 用户名格式错误的getter
   */
  static get NAME_FORMAT_ERROR() {
    return "name_format_error";
  }

  /**
   * 密码格式错误的getter
   */
  static get PASSWORD_FORMAT_ERROR() {
    return "password_format_error";
  }

  /**
   * 登录失败的getter
   */
  static get LOGIN_FAILED() {
    return "login_failed";
  }

  /**
   * 用户登录
   *
   * @param name 登录用户名
   * @param password 登录密码
   * @param redirect 跳转的地址
   *
   * @throw name_format_error 用户名格式错误
   * @throw password_format_error 密码格式错误
   * @throw login_failed 登录失败
   */
  static userLogin(name, password, redirect) {
    if ((null == name) || (0 == name.length)) {
      throw new Error(this.NAME_NO_DATA);
    }
    if ((null == password) || (0 == password.length)) {
      throw new Error(this.PASSWORD_NO_DATA);
    }
    if (null == name.match(/^[0-9a-zA-Z_-]{4,16}$/)) {
      throw new Error(this.NAME_FORMAT_ERROR);
    }
    if (null == password.match(/^\S{1,16}$/)) {
      throw new Error(this.PASSWORD_FORMAT_ERROR);
    }
    let data = {
      "name": name,
      "password": password
    };
    let url = `${Configure.getProjectPath(2)}lego/lego_user?servletName=loginWithNamePassword`;
    let result = Toolkit.ajaxAssistant(url, data, false, true, false);
    if(1 == result.status) {
      window.location.href = redirect;
    } else {
      throw new Error(this.LOGIN_FAILED);
    }
  }

  /**
   * 用户登出
   *
   * @param redirect 跳转的地址
   */
  static userLogout(redirect) {
    var url = `${Configure.getProjectPath(2)}lego/lego_user?servletName=logout`;
    Toolkit.ajaxAssistant(url, "", false, true, false);
    window.location.href = redirect;
  }
}
