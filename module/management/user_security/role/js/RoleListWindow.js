////////////////////////////////////////////////////////////////////////////////
// ECMAScript规范
////////////////////////////////////////////////////////////////////////////////
"use strict";
////////////////////////////////////////////////////////////////////////////////
// RoleListWindow
////////////////////////////////////////////////////////////////////////////////
class RoleListWindow {
  constructor() {
    ////////////////////////////////////////////////////////////////////////////
    // Role列表
    ////////////////////////////////////////////////////////////////////////////
    this.listTable = new JSTable();
    this.listTable.setClass("table-striped table-bordered");
    this.listTable.setThead(
      [
        {
          "text": "Name",
          "colspan": -1
        },
        {
          "text": "Description",
          "colspan": -1
        },
        {
          "text": "Operation",
          "colspan": -1
        }
      ]
    );
    this.listTable.addTbody(
      [
        {
          "text": "superadmin",
          "value": "superadmin",
          "colspan": -1,
          "rowspan": -1
        },
        {
          "text": "super admin",
          "value": "super admin",
          "colspan": -1,
          "rowspan": -1
        },
        {
          "text": `<i class = "icon-edit"></i><i class = "icon-cogs"></i><i class = "icon-remove"></i>`,
          "value": "",
          "colspan": -1,
          "rowspan": -1
        }
      ]
    );
    this.listTable.generateCode();
    ////////////////////////////////////////////////////////////////////////////
    // Create按钮
    ////////////////////////////////////////////////////////////////////////////
    this.createBtn = new JSButton();
    this.createBtn.setText("Create");
    this.createBtn.setClass("btn-primary");
    this.createBtn.generateCode();
    ////////////////////////////////////////////////////////////////////////////
    // 主窗体对象
    ////////////////////////////////////////////////////////////////////////////
    this.mainWindow = new JSWindow();
    this.mainWindow.setWindowDecorationStyle("FRAME");
    this.mainWindow.setTitle("Role List");
    this.mainWindow.setClass("RoleListWindow");
    this.mainWindow.setContent(`
      <div>${this.listTable.getCode()}</div>
      <div>${this.createBtn.getCode()}</div>
    `);
    this.mainWindow.generateCode();
  }
}
