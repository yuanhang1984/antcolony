////////////////////////////////////////////////////////////////////////////////
// ECMAScript规范
////////////////////////////////////////////////////////////////////////////////
"use strict";
////////////////////////////////////////////////////////////////////////////////
// PermissionModifyWindow
////////////////////////////////////////////////////////////////////////////////
class PermissionModifyWindow {
  constructor() {
    ////////////////////////////////////////////////////////////////////////////
    // SelectRole下拉菜单
    ////////////////////////////////////////////////////////////////////////////
    this.roleCB = new JSComboBox();
    this.roleCB.setType("dropdown");
    this.roleCB.addItem({
      "type": "option",
      "text": "Select Role",
      "value": "0",
      "enable": false
    });
    this.roleCB.addItem({
      "type": "option",
      "text": "admin",
      "value": "00000000000000000000000000000000",
      "enable": true 
    });
    this.roleCB.addItem({
      "type": "option",
      "text": "user",
      "value": "00000000000000000000000000000000",
      "enable": true 
    });
    this.roleCB.setSelectedIndex(0);
    this.roleCB.generateCode();
    ////////////////////////////////////////////////////////////////////////////
    // Submit按钮
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
    this.mainWindow.setTitle("Permission Modify");
    this.mainWindow.setClass("PermissionModifyWindow");
    this.mainWindow.setContent(`
      <div>${this.roleCB.getCode()}</div>
      <div>${this.submitBtn.getCode()}</div>
    `);
    this.mainWindow.generateCode();
  }
}
