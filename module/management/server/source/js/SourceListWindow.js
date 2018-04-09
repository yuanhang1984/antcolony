////////////////////////////////////////////////////////////////////////////////
// ECMAScript规范
////////////////////////////////////////////////////////////////////////////////
"use strict";
////////////////////////////////////////////////////////////////////////////////
// SourceListWindow
////////////////////////////////////////////////////////////////////////////////
class SourceListWindow {
  constructor() {
    ////////////////////////////////////////////////////////////////////////////
    // 模块下拉菜单
    ////////////////////////////////////////////////////////////////////////////
    this.modCB = new JSComboBox();
    this.modCB.setType("dropdown");
    this.modCB.addItem({
      "type": "option",
      "text": "Select Module",
      "value": "0",
      "enable": false
    });
    let result = Ajax.submit(Configure.getServerUrl() + "antcolony/getDiskNameList/", null, false, true, false);
    if (!Common.analyseResult(result)) {
      return false;
    }
    let list = result.detail;
    for (let i = 0; i < list.length; i++) {
      this.modCB.addItem({
        "type": "option",
        "text": `${list[i].name}`,
        "value": `${list[i].name}`,
        "enable": true
      });
    }
    this.modCB.setSelectedIndex(0);
    this.modCB.generateCode();
    ////////////////////////////////////////////////////////////////////////////
    // Source列表
    ////////////////////////////////////////////////////////////////////////////
    this.listTable = new JSTable();
    this.listTable.setClass("table-striped table-bordered");
    this.listTable.setThead(
      [
        {
          "text": "Type",
          "colspan": -1
        },
        {
          "text": "File Name",
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
          "text": `Search Result`,
          "value": "",
          "colspan": 3,
          "rowspan": -1
        }
      ]
    );
    // this.listTable.addTbody(
    //   [
    //     {
    //       "text": "necessary",
    //       "value": "necessary",
    //       "colspan": -1,
    //       "rowspan": -1
    //     },
    //     {
    //       "text": "super admin(Demo)",
    //       "value": "super admin",
    //       "colspan": -1,
    //       "rowspan": -1
    //     },
    //     {
    //       "text": `<i class = "icon-edit" data-uuid = "-1"></i><i class = "icon-remove" data-uuid = "-1"></i>`,
    //       "value": "",
    //       "colspan": -1,
    //       "rowspan": -1
    //     }
    //   ]
    // );
    this.listTable.generateCode();
    ////////////////////////////////////////////////////////////////////////////
    // 主窗体对象
    ////////////////////////////////////////////////////////////////////////////
    this.mainWindow = new JSWindow();
    this.mainWindow.setTitle("Source List");
    this.mainWindow.setWindowDecorationStyle("FRAME");
    this.mainWindow.setContent(`
      <div>${this.modCB.getCode()}</div>
      <div>${this.listTable.getCode()}</div>
    `);
    this.mainWindow.setClass("SourceListWindow");
    this.mainWindow.generateCode();
  }

  reLoadSourceList() {
    this.listTable.removeTbodyAll();
    let data = {
      "moduleName": this.selectedModule
    };
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    debugger;
    let result = Ajax.submit(Configure.getServerUrl() + "antcolony/getServerSourceFileList/", data, false, true, false);
    if (!Common.analyseResult(result)) {
      return false;
    }
    let necessary = result.detail.necessary;
    for (let i = 0; i < necessary.length; i++) {
      this.listTable.addTbody(
        [
          {
            "text": "necessary",
            "value": "",
            "colspan": -1,
            "rowspan": -1
          },
          {
            "text": `${necessary[i].name}`,
            "value": "",
            "colspan": -1,
            "rowspan": -1
          },
          {
            "text": `<i class = "icon-remove" data-module = "${this.selectedModule}" data-file = "necessary[i].name" data-type = "necessary"></i>`,
            "value": "",
            "colspan": -1,
            "rowspan": -1
          }
        ]
      );
    }
    let optional = result.detail.optional;
    for (let i = 0; i < optional.length; i++) {
      this.listTable.addTbody(
        [
          {
            "text": "optional",
            "value": "",
            "colspan": -1,
            "rowspan": -1
          },
          {
            "text": `${optional[i].name}`,
            "value": "",
            "colspan": -1,
            "rowspan": -1
          },
          {
            "text": `<i class = "icon-remove" data-module = "${this.selectedModule}" data-file = "optional[i].name" data-type = "optional"></i>`,
            "value": "",
            "colspan": -1,
            "rowspan": -1
          }
        ]
      );
    }
    this.listTable.generateCode();
    this.mainWindow.setContent(`
      <div>${this.modCB.getCode()}</div>
      <div>${this.listTable.getCode()}</div>
    `);
    this.mainWindow.generateCode();
  }

  update() {
    let _this = this;
    this.modCB.update();
    ////////////////////////////////////////////////////////////////////////////
    // 绑定事件
    ////////////////////////////////////////////////////////////////////////////
    $(this.modCB.getObject()).find("ul").find("li").find("a").click(function() {
      if (!$(this).parent().hasClass("disabled")) {
        _this.selectedModule = $(this).parent().attr("data-value");
        _this.reLoadSourceList();
      }
    });
  }
}
