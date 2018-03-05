"use strict";

class JSWindow {
  /*
   * 构造函数（无参）
   * 自动初始化对象的id。
   */
  constructor() {
    this.objectId = JString.getUuid(true);
    this.objectTitle = "";
    this.objectContent = "";
    this.objectWindowDecorationStyle = "FRAME";
    this.objectClass = "";
    this.objectCode = "";
  }

  getId() {
    return this.objectId;
  }

  setTitle(title) {
    this.objectTitle = title;
  }

  getTitle() {
    return this.objectTitle;
  }

  setContent(content) {
    this.objectContent = content;
  }

  getContent() {
    return this.objectContent;
  }

  setWindowDecorationStyle(windowDecorationStyle) {
    this.objectWindowDecorationStyle = windowDecorationStyle;
  }

  getWindowDecorationStyle() {
    return this.objectWindowDecorationStyle;
  }

  setClass(clazz) {
    this.objectClass = clazz;
  }

  getClass() {
    return this.objectClass;
  }

  getCode() {
    return this.objectCode;
  }

  /*
   * setWindowDecorationStyle 设置窗口装饰
   *                          NONE 无装饰（只有一个border）
   *                          FRAME 普通窗口风格（无关闭按钮）
   *                          DIALOG 普通窗口风格（含关闭按钮）
   */
  generateCode() {
    let closeBtnCode = "";
    if ("DIALOG" == this.getWindowDecorationStyle().toUpperCase()) {
      closeBtnCode = `<button type = "button" class = "close">&times;</button>`;
    }
    let titleCode = `
      <div class = "panel-heading">${this.getTitle()}${closeBtnCode}</div>
    `;
    if ("NONE" == this.getWindowDecorationStyle().toUpperCase()) {
      titleCode = "";
    }
    this.objectCode = `
      <div class = "panel panel-primary" id = "${this.getId()}">
        ${titleCode}
        <div class = "panel-body">${this.getContent()}</div>
      </div>
    `;
  }
}
