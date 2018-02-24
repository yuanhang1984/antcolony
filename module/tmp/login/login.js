"use strict";

class Login {
  /**
   * 构造函数
   *
   * @param outputId 传入输出的元素id
   * @param redirect 登录成功后的跳转地址
   */
  constructor(outputId, redirect) {
    this.outputId = outputId;
    this.redirect = redirect;
  }

  /**
   * 初始化函数
   */
  init() {
    let currentObject = this;
    // 绑定登录按钮事件
    $(document).on("click", "#login_btn", function() {
      let name = $(".login_username_val").val();
      let password = $(".login_password_val").val();
      try {
        let redirect = Toolkit.getQueryFromUrl("redirect");
        if (null == redirect) {
          UserStatus.userLogin(name, password, currentObject.redirect);
        } else {
          UserStatus.userLogin(name, password, redirect);
        }
      } catch (e) {
        if (UserStatus.NAME_NO_DATA == e.message) {
          alert("用户名不能为空");
        } else if (UserStatus.PASSWORD_NO_DATA == e.message) {
          alert("密码不能为空");
        } else if (UserStatus.NAME_FORMAT_ERROR == e.message) {
          alert("用户名格式错误");
        } else if (UserStatus.PASSWORD_FORMAT_ERROR == e.message) {
          alert("密码格式错误");
        } else if (UserStatus.LOGIN_FAILED == e.message) {
          alert("登录失败");
        }
      }
    });
    // 绑定回车键盘事件
    $(document).keydown(function(e) {
      if(13 == e.keyCode){
        $("#login_btn").trigger("click");
      }
    });
  }

  /**
   * 输出登录界面
   */
  output() {
    let code = 
      `<div class = "container-fluid">
        <div class = "panel panel-primary login_middle">
          <div class = "panel-heading panel-primary">登录</div>
          <div class = "panel-body">
            <div class = "text-center"><img src = "../../img/fjerp_logo_blue.png" width = "66"></div>
            <div class = "form-group">
              <label class = "pull-left">用户名</label><span class = "pull-left login_ml5" id = "login_username"></span>
              <input type = "text" class = "form-control login_username_val" value = "">
            </div>
            <div class = "form-group span-block">
              <label class = "pull-left">密码</label><span class = "pull-left login_ml5" id = "login_password"></span>
              <input type = "password" class = "form-control login_password_val" value = "">
            </div>
            <div class = "form-group text-center"><button type = "button" class = "btn btn-primary" id = "login_btn">登录</button></div>
          </div>
        </div>
      </div>`;
    $(this.outputId).html(code);
  }
}
