////////////////////////////////////////////////////////////////////////////////
// ECMAScript规范
////////////////////////////////////////////////////////////////////////////////
"use strict";
////////////////////////////////////////////////////////////////////////////////
// ModifyPasswordWindow
////////////////////////////////////////////////////////////////////////////////
class ModifyPasswordWindow {
  constructor() {
    ////////////////////////////////////////////////////////////////////////////
    // Password输入框
    ////////////////////////////////////////////////////////////////////////////
    this.pwdTF = new JSTextField();
    this.pwdTF.setPlaceHolder("Password");
    this.pwdTF.setType("password");
    this.pwdTF.generateCode();
    ////////////////////////////////////////////////////////////////////////////
    // Password Confirm输入框
    ////////////////////////////////////////////////////////////////////////////
    this.rePwdTF = new JSTextField();
    this.rePwdTF.setPlaceHolder("Password Confirm");
    this.rePwdTF.setType("password");
    this.rePwdTF.generateCode();
    ////////////////////////////////////////////////////////////////////////////
    // 创建下载按钮
    ////////////////////////////////////////////////////////////////////////////
    this.submitBtn = new JSButton();
    this.submitBtn.setText("Submit");
    this.submitBtn.setClass("btn-primary");
    this.submitBtn.generateCode();
    ////////////////////////////////////////////////////////////////////////////
    // 主窗体对象
    ////////////////////////////////////////////////////////////////////////////
    this.mainWindow = new JSWindow();
    this.mainWindow.setWindowDecorationStyle("FRAME");
    this.mainWindow.setTitle("Modify Password");
    this.mainWindow.setClass("ModifyPasswordWindow");
    let mainWindowCode = `
      <div>${this.pwdTF.getCode()}</div>
      <div>${this.rePwdTF.getCode()}</div>
      <div>${this.submitBtn.getCode()}</div>
    `;
    this.mainWindow.setContent(mainWindowCode);
    this.mainWindow.generateCode();
  }

  update() {
    this.pwdTF.update();
    this.rePwdTF.update();
    let _this = this;
    ////////////////////////////////////////////////////////////////////////////
    // 绑定Submit按钮事件
    ////////////////////////////////////////////////////////////////////////////
    $("#" + this.submitBtn.getId()).click(function() {
      let password = _this.pwdTF.getValue();
      let rePassword = _this.rePwdTF.getValue();
      if (null == password.match(/^\S{1,16}$/)) {
        $("#" + _this.pwdTF.getId()).val("");
        $("#" + _this.pwdTF.getId()).attr("placeholder", "Password Format Incorrect");
        $("#" + _this.pwdTF.getId()).css("background-color", "#ffb1b1");
        return;
      }
      if (null == rePassword.match(/^\S{1,16}$/)) {
        $("#" + _this.rePwdTF.getId()).val("");
        $("#" + _this.rePwdTF.getId()).attr("placeholder", "Password Format Incorrect");
        $("#" + _this.rePwdTF.getId()).css("background-color", "#ffb1b1");
        return;
      }
      if (password != rePassword) {
        $("#" + _this.rePwdTF.getId()).val("");
        $("#" + _this.rePwdTF.getId()).attr("placeholder", "The Password Must Be Same");
        $("#" + _this.rePwdTF.getId()).css("background-color", "#ffb1b1");
        return;
      }
      let data = {
        "password": password
      };
      let result = Ajax.submit(Configure.getProjectPath() + "user_security/modifyUserForPassword/", data, false, true, false);
      if ("success" == result.status.toLowerCase()) {
        alert("Success");
        location.reload();
      } else {
        alert("Error");
      }
    });
  }
}
