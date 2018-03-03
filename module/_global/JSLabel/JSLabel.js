"use strict";

class JSLabel {
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
   * 生成源码
   */
  generateCode() {
    this.objectCode = `
      <span class = "${this.getClass()}" id = "${this.getId()}">${this.getText()}</span>
    `;
  }
}
