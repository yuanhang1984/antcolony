"use strict";

class JSTip {
  /*
   * 构造函数（无参）
   * 自动初始化对象的id。
   */
  constructor() {
    this.objectId = JString.getUuid(true);
    this.objectText = "";
    this.objectClass = "";
    this.objectCode = "";
  }

  getId() {
    return this.objectId;
  }

  setText(text) {
    this.objectText = text;
  }

  getText() {
    return this.objectText;
  }

  getText() {
    return this.objectText;
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

  generateCode() {
    this.objectCode = `
      <div class = "alert ${this.getClass()}">${this.getText()}<button type = "button" class = "close" data-dismiss = "alert" aria-label = "Close"><span aria-hidden = "true">&times;</span></button></div>
    `;
  }
}
