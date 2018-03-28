////////////////////////////////////////////////////////////////////////////////
// ECMAScript规范
////////////////////////////////////////////////////////////////////////////////
"use strict";
////////////////////////////////////////////////////////////////////////////////
// SqlListWindow
////////////////////////////////////////////////////////////////////////////////
class SqlListWindow {
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
    let result = Ajax.submit(Configure.getServerUrl() + "antcolony/getNameList/", null, false, true, false);
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
    // 文件内容输入框
    ////////////////////////////////////////////////////////////////////////////
    this.cntTA = new JSTextArea();
    this.cntTA.setClass("form-control");
    this.cntTA.setReadOnly(true);
    this.cntTA.generateCode();
    ////////////////////////////////////////////////////////////////////////////
    // 上传按钮
    ////////////////////////////////////////////////////////////////////////////
    this.uploadBtn = new JSButton();
    this.uploadBtn.setText("Upload");
    this.uploadBtn.setClass("btn-primary");
    this.uploadBtn.generateCode();
    ////////////////////////////////////////////////////////////////////////////
    // 创建下载按钮
    ////////////////////////////////////////////////////////////////////////////
    this.downloadBtn = new JSButton();
    this.downloadBtn.setText("Download");
    this.downloadBtn.setClass("btn-primary");
    this.downloadBtn.generateCode();
    ////////////////////////////////////////////////////////////////////////////
    // 主窗体对象
    ////////////////////////////////////////////////////////////////////////////
    this.mainWindow = new JSWindow();
    this.mainWindow.setWindowDecorationStyle("FRAME");
    this.mainWindow.setTitle("SQL List");
    this.mainWindow.setClass("SqlListWindow");
    let mainWindowCode = `
      <div>${this.modCB.getCode()}</div>
      <div>${this.cntTA.getCode()}</div>
      <div>${this.uploadBtn.getCode() + this.downloadBtn.getCode()}</div>
    `;
    this.mainWindow.setContent(mainWindowCode);
    this.mainWindow.generateCode();
  }

  update() {
    let _this = this;
    this.modCB.update();
    ////////////////////////////////////////////////////////////////////////////
    // 绑定change事件
    ////////////////////////////////////////////////////////////////////////////
    $(this.modCB.getObject()).find("ul").find("li").find("a").click(function() {
      if (!$(this).parent().hasClass("disabled")) {
        let name = $(_this.modCB.getObject()).find("button").attr("data-value");
        let data = {
          "name": name
        };
        let result = Ajax.submit(Configure.getServerUrl() + "antcolony/getSqlContent/", data, false, true, false);
        if (!Common.analyseResult(result)) {
          return false;
        }
        for (let i = 0; i < result.detail.length; i++) {
          $(_this.cntTA.getObject()).html(result.detail);
        }
        $(_this.downloadBtn.getObject()).prop("disabled", false);
      }
    });
    ////////////////////////////////////////////////////////////////////////////
    // 绑定Download按钮事件
    ////////////////////////////////////////////////////////////////////////////
    $(this.downloadBtn.getObject()).click(function() {
      let name = $(_this.modCB.getObject()).find("button").attr("data-name");
      window.open(Configure.getServerUrl() + "antcolony/downloadServerResourceFile/?name=" + name + "&type=sql");
    });
  }
}
