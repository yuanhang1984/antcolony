"use strict";

class JSTextArea {
  /*
   * 构造函数（无参）
   * 自动初始化对象的id。
   */
  constructor() {
    this.objectId = JString.getUuid(true);
    this.objectText = "";
    this.objectPlaceHolder = "";
    this.objectReadOnly = false;
    this.objectClass = "";
    this.objectCode = "";
  }

  getId() {
    return this.objectId;
  }

  getObject() {
    return $("#" + this.getId());
  }

  setText(text) {
    this.objectText = text;
  }

  getText() {
    return this.objectText;
  }

  setPlaceHolder(placeHolder) {
    this.objectPlaceHolder = placeHolder;
  }

  getPlaceHolder() {
    return this.objectPlaceHolder;
  }

  setClass(clazz) {
    this.objectClass = clazz;
  }

  getClass() {
    return this.objectClass;
  }

  setReadOnly(readOnly) {
    this.objectReadOnly = readOnly;
  }

  getReadOnly() {
    return this.objectReadOnly;
  }

  getCode() {
    return this.objectCode;
  }

  /* 
   * 生成源码
   *
   * setPlaceHolder 设置placeholder
   */
  generateCode() {
    let readOnly = "";
    if (this.getReadOnly()) {
      readOnly = "readonly";
    }
    this.objectCode = `
      <textarea ${readOnly} class = "form-control ${this.getClass()}" id = "${this.getId()}" placeholder = "${this.getPlaceHolder()}">${this.getText()}</textarea>
    `;
  }
}
