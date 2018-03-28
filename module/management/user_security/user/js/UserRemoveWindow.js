////////////////////////////////////////////////////////////////////////////////
// ECMAScript规范
////////////////////////////////////////////////////////////////////////////////
"use strict";
////////////////////////////////////////////////////////////////////////////////
// UserRemoveWindow
////////////////////////////////////////////////////////////////////////////////
class UserRemoveWindow {
  constructor() {
    ////////////////////////////////////////////////////////////////////////////
    // Content标签
    ////////////////////////////////////////////////////////////////////////////
    this.cntLB = new JSLabel();
    this.cntLB.setText("Do you want to remove this user?");
    this.cntLB.generateCode();
    ////////////////////////////////////////////////////////////////////////////
    // Submit按钮
    ////////////////////////////////////////////////////////////////////////////
    this.submitBtn = new JSButton();
    this.submitBtn.setText("Submit");
    this.submitBtn.setClass("btn-primary");
    this.submitBtn.generateCode();
    ////////////////////////////////////////////////////////////////////////////
    // 取消按钮
    ////////////////////////////////////////////////////////////////////////////
    this.cancelBtn= new JSButton();
    this.cancelBtn.setText("Cancel");
    this.cancelBtn.setClass("btn-default");
    this.cancelBtn.generateCode();
    ////////////////////////////////////////////////////////////////////////////
    // 主窗体对象
    ////////////////////////////////////////////////////////////////////////////
    this.mainWindow = new JSWindow();
    this.mainWindow.setTitle("Remove");
    this.mainWindow.setWindowDecorationStyle("DIALOG");
    this.mainWindow.setContent(`
      <div>${this.cntLB.getCode()}</div>
      <div>${this.submitBtn.getCode() + this.cancelBtn.getCode()}</div>
    `);
    this.mainWindow.setClass("UserRemoveWindow");
    this.mainWindow.generateCode();
  }

  update() {
    ////////////////////////////////////////////////////////////////////////////
    // 绑定Submit按钮事件
    ////////////////////////////////////////////////////////////////////////////
    let _this = this;
    $(this.submitBtn.getObject()).click(function() {
      let uuid = $(_this.mainWindow.getObject()).attr("data-uuid");
      let data = {
        "uuid": uuid
      };
      let result = Ajax.submit(Configure.getServerUrl() + "user_security/removeUser/", data, false, true, false);
      if (Common.analyseResult(result)) {
        // 关闭窗口
        $(_this.cancelBtn.getObject()).trigger("click");
      } else {
        // 添加失败
        alert("Remove Failed");
      }
    });
    ////////////////////////////////////////////////////////////////////////////
    // 关联Cancel按钮关闭模态窗口
    ////////////////////////////////////////////////////////////////////////////
    $(this.cancelBtn.getObject()).attr("data-dismiss", "modal"); 
  }
}
